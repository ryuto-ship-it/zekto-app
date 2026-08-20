import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii } from '../../theme/theme';
import { getProduct } from '../../data/products';
import { finalPrice, won } from '../../utils/format';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import Sheet from '../../components/Sheet';
import { PrimaryButton } from '../../components/Buttons';
import { RootStackParamList } from '../../navigation/types';
import { COINS, CoinSymbol, PaymentSource, zektoSource } from '../../types/purchase';

export default function PurchaseSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Purchase'>>();
  const product = getProduct(route.params.productId);
  const { purchasePass, buyResaleListing, resaleListings, balance, points, tier } = useApp();
  const showToast = useToast();
  const [confirming, setConfirming] = useState(false);
  const [coin, setCoin] = useState<CoinSymbol>('USDT');
  const [source, setSource] = useState<PaymentSource>(() => zektoSource(balance, 'USDT'));
  const [usePoints, setUsePoints] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null);
  const fillAnim = useRef(new Animated.Value(0)).current;
  const pointsCountAnim = useRef(new Animated.Value(0)).current;
  const [displayedEarned, setDisplayedEarned] = useState(0);

  const resaleId = route.params.resaleId;
  const listing = resaleId ? resaleListings.find((l) => l.id === resaleId) : undefined;

  useEffect(() => {
    if (earnedPoints === null) return;
    pointsCountAnim.setValue(0);
    const id = pointsCountAnim.addListener(({ value }) => setDisplayedEarned(Math.round(value)));
    Animated.timing(pointsCountAnim, { toValue: earnedPoints, duration: 900, useNativeDriver: false }).start();
    return () => pointsCountAnim.removeListener(id);
  }, [earnedPoints, pointsCountAnim]);

  if (!product) return null;

  // Tier members get an extra stablecoin-only discount on top of the product's base coinPct
  // (must mirror AppContext.purchasePass's math exactly so the preview matches the charge).
  const basePrice = listing ? listing.resalePrice : finalPrice(product.price, product.coinPct + tier.discountBonusPct);
  const pointsRedeemable = Math.max(0, Math.min(points, Math.floor(basePrice)));
  const pointsRedeemed = usePoints ? pointsRedeemable : 0;
  const payable = basePrice - pointsRedeemed;
  const previewEarn = listing ? Math.round(listing.resalePrice * tier.earnRate) : Math.round(payable * tier.earnRate);

  const onSelectCoin = (next: CoinSymbol) => {
    setCoin(next);
    setSource((prev) => (prev.type === 'zekto' ? zektoSource(balance, next) : prev));
  };

  const openWalletChoice = () => {
    navigation.navigate('WalletConnect', { currentCoin: coin, onSelectSource: setSource });
  };

  const confirm = () => {
    if (confirming) return;
    setConfirming(true);
    Animated.timing(fillAnim, { toValue: 100, duration: 550, useNativeDriver: false }).start(() => {
      if (listing) {
        const result = buyResaleListing(listing.id, coin, source.label);
        setEarnedPoints(result?.earnedPoints ?? 0);
      } else {
        const result = purchasePass(product, coin, source.label, pointsRedeemed);
        setEarnedPoints(result.earnedPoints);
      }
    });
  };

  const finish = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Tabs', params: { screen: 'Wallet' } }],
      })
    );
    showToast(listing ? '✓ Bought resale pass · Added to your Wallet' : `✓ Paid with ${coin} · Added to your Wallet`);
  };

  const sourceIcon = source.type === 'zekto' ? 'F' : source.type === 'MetaMask' ? '🦊' : '🛡️';

  if (earnedPoints !== null) {
    return (
      <Sheet onClose={finish} scroll={false}>
        <View style={styles.successWrap}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Pass added to your wallet</Text>
          <Text style={styles.successSub}>{product.title}</Text>
          {earnedPoints > 0 ? (
            <View style={styles.pointsEarnedCard}>
              <Text style={styles.pointsEarnedLabel}>FUTUREPASS POINTS EARNED</Text>
              <Text style={styles.pointsEarnedNum}>+{displayedEarned.toLocaleString('en-US')}P</Text>
            </View>
          ) : null}
          <PrimaryButton label="Continue" onPress={finish} style={styles.continueBtn} />
        </View>
      </Sheet>
    );
  }

  return (
    <Sheet onClose={() => navigation.goBack()} scroll>
      <View style={styles.header}>
        <Text style={styles.h2}>Confirm your purchase</Text>
      </View>

      <Row label="Benefit" value={product.title} />
      <Row label="Merchant" value={product.merchant} />
      {listing ? <Row label="Sold by" value={listing.sellerLabel} /> : null}
      <Row label="Valid until" value="90 days after purchase" />
      {!listing && tier.discountBonusPct > 0 ? (
        <Row label="Tier discount" value={`${tier.label} member · +${tier.discountBonusPct}%p off`} />
      ) : null}
      {pointsRedeemed > 0 ? <Row label="Points applied" value={`-${won(pointsRedeemed)} (${pointsRedeemed.toLocaleString('en-US')}P)`} /> : null}
      <Row label={listing ? 'Resale price' : 'Final price'} value={won(payable)} last />

      {!listing ? (
        <Pressable style={styles.pointsRow} onPress={() => setUsePoints((v) => !v)} disabled={pointsRedeemable <= 0}>
          <View style={[styles.checkbox, usePoints && styles.checkboxActive]}>
            {usePoints ? <Text style={styles.checkboxMark}>✓</Text> : null}
          </View>
          <View style={styles.pointsRowText}>
            <Text style={styles.pointsRowTitle}>Use my points</Text>
            <Text style={styles.pointsRowSub}>{points.toLocaleString('en-US')}P available</Text>
          </View>
        </Pressable>
      ) : null}

      <Text style={styles.cap}>Choose a stablecoin</Text>
      <View style={styles.coinTabs}>
        {COINS.map((c) => {
          const active = c.symbol === coin;
          return (
            <Pressable key={c.symbol} style={[styles.coinTab, active && styles.coinTabActive]} onPress={() => onSelectCoin(c.symbol)}>
              <Text style={[styles.coinSym, active && styles.coinSymActive]}>{c.symbol}</Text>
              <Text style={styles.coinNet}>{c.network}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.earnPreview}>
        <Text style={styles.earnPreviewLabel}>Points you'll earn on this purchase</Text>
        <Text style={styles.earnPreviewValue}>+{previewEarn.toLocaleString('en-US')}P</Text>
      </View>

      <Pressable style={styles.sourceRow} onPress={openWalletChoice}>
        <View style={styles.sourceLeft}>
          <View style={styles.sourceIcon}>
            <Text style={styles.sourceIconText}>{sourceIcon}</Text>
          </View>
          <View>
            <Text style={styles.sourceTitle}>{source.label}</Text>
            <Text style={styles.sourceSub}>{source.sub}</Text>
          </View>
        </View>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>

      <Pressable style={styles.slideBtn} onPress={confirm} disabled={confirming}>
        <Animated.View
          style={[
            styles.slideFill,
            { width: fillAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) },
          ]}
        />
        <Text style={styles.slideText}>{confirming ? 'Confirming…' : 'Slide to confirm · Pay now'}</Text>
      </Pressable>
    </Sheet>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 6 },
  h2: { fontFamily: fonts.serifMedium, fontSize: 18, color: colors.ink },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.line,
  },
  rowLast: {},
  rowLabel: { fontSize: 13, color: colors.inkSoft, fontFamily: fonts.sans },
  rowValue: { fontSize: 13, fontFamily: fonts.sansBold, color: colors.ink, flexShrink: 1, textAlign: 'right', marginLeft: 12 },
  pointsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 20, marginTop: 14,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: radii.md, padding: 12,
  },
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkboxMark: { color: colors.white, fontSize: 12, fontWeight: '700' },
  pointsRowText: { flex: 1 },
  pointsRowTitle: { fontSize: 12.5, color: colors.ink, fontFamily: fonts.sansBold },
  pointsRowSub: { fontSize: 10.5, color: colors.inkSoft, marginTop: 1, fontFamily: fonts.sans },
  cap: {
    marginHorizontal: 20, marginTop: 14, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6,
    color: colors.inkSoft, fontFamily: fonts.sansBold,
  },
  coinTabs: { flexDirection: 'row', gap: 8, marginHorizontal: 20, marginTop: 8 },
  coinTab: { flex: 1, borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.white, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 8, alignItems: 'center' },
  coinTabActive: { borderColor: colors.primary, backgroundColor: colors.primaryTint },
  coinSym: { fontFamily: fonts.monoSemiBold, fontSize: 13, color: colors.ink },
  coinSymActive: { color: colors.primary },
  coinNet: { fontSize: 9.5, color: colors.inkSoft, marginTop: 2, fontFamily: fonts.sans },
  earnPreview: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 12,
    backgroundColor: colors.roseTint, borderRadius: radii.md, paddingVertical: 10, paddingHorizontal: 14,
  },
  earnPreviewLabel: { fontSize: 11, color: colors.roseDeep, fontFamily: fonts.sansBold, flexShrink: 1, marginRight: 8 },
  earnPreviewValue: { fontSize: 14, color: colors.roseDeep, fontFamily: fonts.monoSemiBold },
  sourceRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 14,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 14, padding: 13,
  },
  sourceLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  sourceIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  sourceIconText: { fontWeight: '700', color: colors.primary, fontSize: 13 },
  sourceTitle: { fontSize: 12.5, color: colors.ink, fontFamily: fonts.sansBold },
  sourceSub: { fontSize: 10.5, color: colors.inkSoft, marginTop: 1, fontFamily: fonts.sans },
  chevron: { color: colors.inkSoft, fontSize: 16 },
  slideBtn: {
    marginHorizontal: 20, marginTop: 18, marginBottom: 10, backgroundColor: colors.primary, borderRadius: radii.lg,
    height: 54, alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  slideFill: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: colors.gold },
  slideText: { color: colors.goldTint, fontSize: 13, fontFamily: fonts.sansBold },
  successWrap: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 36, paddingBottom: 10 },
  checkCircle: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: colors.primaryTint,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  checkMark: { fontSize: 26, color: colors.primary },
  successTitle: { fontFamily: fonts.serifMedium, fontSize: 17, color: colors.ink, textAlign: 'center' },
  successSub: { fontSize: 12, color: colors.inkSoft, marginTop: 4, textAlign: 'center', fontFamily: fonts.sans },
  pointsEarnedCard: {
    marginTop: 20, marginBottom: 24, alignItems: 'center', backgroundColor: colors.roseTint, borderRadius: radii.lg,
    paddingVertical: 16, paddingHorizontal: 28,
  },
  pointsEarnedLabel: { fontSize: 10, letterSpacing: 0.6, color: colors.roseDeep, fontFamily: fonts.sansBold },
  pointsEarnedNum: { fontSize: 26, color: colors.roseDeep, fontFamily: fonts.monoSemiBold, marginTop: 6 },
  continueBtn: { flex: 0, alignSelf: 'stretch', marginBottom: 4 },
});
