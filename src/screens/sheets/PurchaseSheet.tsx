import React, { useRef, useState } from 'react';
import { View, Text, Animated, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii } from '../../theme/theme';
import { getProduct } from '../../data/products';
import { finalPrice, won } from '../../utils/format';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import Sheet from '../../components/Sheet';
import { RootStackParamList } from '../../navigation/types';
import { COINS, CoinSymbol, PaymentSource, zektoSource } from '../../types/purchase';

export default function PurchaseSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Purchase'>>();
  const product = getProduct(route.params.productId);
  const { purchasePass, balance } = useApp();
  const showToast = useToast();
  const [confirming, setConfirming] = useState(false);
  const [coin, setCoin] = useState<CoinSymbol>('USDT');
  const [source, setSource] = useState<PaymentSource>(() => zektoSource(balance, 'USDT'));
  const fillAnim = useRef(new Animated.Value(0)).current;

  if (!product) return null;

  const coinPrice = finalPrice(product.price, product.coinPct);

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
      purchasePass(product, coin, source.label);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Tabs', params: { screen: 'Wallet' } }],
        })
      );
      showToast(`✓ Paid with ${coin} · Added to your Wallet`);
    });
  };

  const sourceIcon = source.type === 'zekto' ? 'Z' : source.type === 'MetaMask' ? '🦊' : '🛡️';

  return (
    <Sheet onClose={() => navigation.goBack()} scroll>
      <View style={styles.header}>
        <Text style={styles.h2}>Confirm your purchase</Text>
      </View>

      <Row label="Benefit" value={product.title} />
      <Row label="Merchant" value={product.merchant} />
      <Row label="Valid until" value="90 days after purchase" />
      <Row label="Final price" value={won(coinPrice)} last />

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
  cap: {
    marginHorizontal: 20, marginTop: 14, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6,
    color: colors.inkSoft, fontFamily: fonts.sansBold,
  },
  coinTabs: { flexDirection: 'row', gap: 8, marginHorizontal: 20, marginTop: 8 },
  coinTab: { flex: 1, borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.white, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 8, alignItems: 'center' },
  coinTabActive: { borderColor: colors.jade, backgroundColor: colors.jadeTint },
  coinSym: { fontFamily: fonts.monoSemiBold, fontSize: 13, color: colors.ink },
  coinSymActive: { color: colors.jadeDeep },
  coinNet: { fontSize: 9.5, color: colors.inkSoft, marginTop: 2, fontFamily: fonts.sans },
  sourceRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 14,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 14, padding: 13,
  },
  sourceLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  sourceIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.jadeTint, alignItems: 'center', justifyContent: 'center' },
  sourceIconText: { fontWeight: '700', color: colors.jadeDeep, fontSize: 13 },
  sourceTitle: { fontSize: 12.5, color: colors.ink, fontFamily: fonts.sansBold },
  sourceSub: { fontSize: 10.5, color: colors.inkSoft, marginTop: 1, fontFamily: fonts.sans },
  chevron: { color: colors.inkSoft, fontSize: 16 },
  slideBtn: {
    marginHorizontal: 20, marginTop: 18, marginBottom: 10, backgroundColor: colors.jadeDeep, borderRadius: radii.lg,
    height: 54, alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  slideFill: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: colors.gold },
  slideText: { color: colors.goldTint, fontSize: 13, fontFamily: fonts.sansBold },
});
