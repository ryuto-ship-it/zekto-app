import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii, shadows, categoryLabels, categoryAccents } from '../../theme/theme';
import { getProduct } from '../../data/products';
import { won, finalPrice, imgUrl } from '../../utils/format';
import Sheet from '../../components/Sheet';
import PriceLadder from '../../components/PriceLadder';
import { PrimaryButton } from '../../components/Buttons';
import { useToast } from '../../context/ToastContext';
import { useApp } from '../../context/AppContext';
import { RootStackParamList } from '../../navigation/types';

const REASON_CHIPS = [
  { label: 'Card keeps failing abroad?', toast: "That's exactly why stablecoin works here." },
  { label: 'Already holding stablecoin?', toast: 'Even better — pay straight from your balance.' },
];

export default function ProductDetailSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const product = getProduct(route.params.productId);
  const showToast = useToast();
  const { resaleListings } = useApp();
  const resaleId = route.params.resaleId;
  const listing = resaleId ? resaleListings.find((l) => l.id === resaleId) : undefined;

  if (!product) return null;

  const cardPrice = finalPrice(product.price, product.cardPct);
  const cashPrice = finalPrice(product.price, product.cashPct);
  const coinPrice = listing ? listing.resalePrice : finalPrice(product.price, product.coinPct);
  const wasPrice = listing ? listing.originalPrice : product.price;

  return (
    <Sheet
      onClose={() => navigation.goBack()}
      footer={
        <>
          <View style={styles.ctaPrice}>
            <Text style={styles.ctaWas}>{won(wasPrice)}</Text>
            <Text style={styles.ctaNow}>{won(coinPrice)}</Text>
          </View>
          <PrimaryButton
            label={listing ? 'Buy this Resale Pass' : 'Buy this Pass'}
            onPress={() => navigation.navigate('Purchase', { productId: product.id, resaleId })}
          />
        </>
      }
    >
      <Image source={{ uri: imgUrl(product.image, 780) }} style={styles.hero} resizeMode="cover" />
      <View style={styles.body}>
        <View style={styles.catRow}>
          <Text style={[styles.cat, { color: categoryAccents[product.cat] }]}>{categoryLabels[product.cat]}</Text>
          {listing ? (
            <View style={styles.resaleTag}>
              <Text style={styles.resaleTagText}>RESALE</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.merchant}>📍 {product.merchant} · {product.loc}</Text>
        {listing ? <Text style={styles.sellerLine}>Resold by {listing.sellerLabel}</Text> : null}
        <Text style={styles.desc}>{product.desc}</Text>

        <View style={styles.aiBadge}>
          <Text style={styles.aiText}>
            ✨ <Text style={styles.aiBold}>SSDA AI</Text> found your best benefit and applied it automatically — no codes to enter.
          </Text>
        </View>

        <View style={styles.reasonRow}>
          {REASON_CHIPS.map((r) => (
            <Pressable key={r.label} style={styles.reasonChip} onPress={() => showToast(r.toast)}>
              <Text style={styles.reasonChipText}>{r.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.ladderCard}>
          <Text style={styles.ladderCap}>{listing ? 'Original price vs. resale price' : 'Same benefit, three ways to pay'}</Text>
          <PriceLadder
            variant="detail"
            rows={[
              { label: 'Card', amount: cardPrice, widthPct: 95, kind: 'card' },
              { label: 'Cash', amount: cashPrice, widthPct: 92, kind: 'cash' },
              {
                label: listing ? 'Resale' : 'Stablecoin',
                amount: coinPrice,
                widthPct: listing ? Math.max(30, Math.round((coinPrice / wasPrice) * 100)) : Math.max(85, 100 - product.coinPct * 2),
                kind: 'coin',
              },
            ]}
            bestText={listing ? `RESALE · ${won(wasPrice - coinPrice)} OFF ORIGINAL` : `ALWAYS ACCEPTED · ${won(product.price - coinPrice)} CHEAPER`}
          />
          {!listing ? <Text style={styles.ladderNote}>Card merchant fees, shared back with you.</Text> : null}
          <View style={styles.chainBadge}>
            <Text style={styles.chainBadgeText}>⛓ On-chain Issued · tamper-proof</Text>
          </View>
        </View>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  hero: { width: '100%', height: 190, backgroundColor: colors.paper },
  body: { paddingHorizontal: 20 },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16 },
  cat: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: colors.jade, fontFamily: fonts.sansBold },
  resaleTag: { backgroundColor: colors.gold, borderRadius: 5, paddingVertical: 2, paddingHorizontal: 6 },
  resaleTagText: { fontSize: 9, fontFamily: fonts.sansBold, color: colors.jadeDeep, letterSpacing: 0.4 },
  title: { fontFamily: fonts.serifMedium, fontSize: 21, marginTop: 6, marginBottom: 4, color: colors.ink, lineHeight: 26 },
  merchant: { fontSize: 12.5, color: colors.inkSoft, fontFamily: fonts.sans },
  sellerLine: { fontSize: 11.5, color: colors.gold, fontFamily: fonts.sansBold, marginTop: 3 },
  desc: { fontSize: 13, color: colors.inkSoft, lineHeight: 20, marginVertical: 14, fontFamily: fonts.sans },
  aiBadge: { flexDirection: 'row', backgroundColor: colors.goldTint, borderWidth: 1, borderColor: '#E4D6A8', padding: 12, borderRadius: 12, marginVertical: 14 },
  aiText: { fontSize: 11.5, color: '#7A6023', flex: 1, fontFamily: fonts.sans },
  aiBold: { color: '#5E4A1A', fontFamily: fonts.sansBold },
  reasonRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4 },
  reasonChip: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: radii.pill,
    paddingVertical: 7, paddingHorizontal: 12,
  },
  reasonChipText: { fontSize: 11.5, color: colors.jadeDeep, fontFamily: fonts.sansBold },
  ladderCard: { backgroundColor: colors.white, borderRadius: radii.xl, padding: 16, marginVertical: 14, ...shadows.card },
  ladderCap: { fontSize: 10.5, textTransform: 'uppercase', letterSpacing: 0.6, color: colors.inkSoft, fontFamily: fonts.sansBold, marginBottom: 10 },
  ladderNote: { fontSize: 10.5, color: colors.inkSoft, marginTop: 10, fontFamily: fonts.sans },
  chainBadge: { alignSelf: 'flex-start', marginTop: 10, backgroundColor: colors.jadeTint, borderRadius: radii.sm, paddingVertical: 4, paddingHorizontal: 8 },
  chainBadgeText: { fontSize: 10, color: colors.jadeDeep, fontFamily: fonts.sansBold },
  ctaPrice: {},
  ctaWas: { fontSize: 11, color: '#9AA79D', textDecorationLine: 'line-through', fontFamily: fonts.mono },
  ctaNow: { fontFamily: fonts.monoSemiBold, fontSize: 18, color: colors.jadeDeep },
});
