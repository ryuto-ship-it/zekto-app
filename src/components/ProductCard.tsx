import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fonts, radii, shadows, categoryLabels, categoryAccents } from '../theme/theme';
import { won, finalPrice, imgUrl } from '../utils/format';
import { Product } from '../data/products';
import { StarIcon } from './Icons';
import { AnimatedPressable } from './AnimatedCard';

export function PickCard({ product, onPress }: { product: Product; onPress: () => void }) {
  const price = finalPrice(product.price, product.coinPct);
  const accent = categoryAccents[product.cat];
  return (
    <AnimatedPressable style={styles.pickCard} onPress={onPress}>
      <View style={styles.pickThumbWrap}>
        <Image source={{ uri: imgUrl(product.image, 344) }} style={styles.pickThumb} resizeMode="cover" />
        <View style={[styles.badge, { backgroundColor: colors.coral }]}>
          <Text style={styles.badgeText}>-{product.coinPct}%</Text>
        </View>
      </View>
      <View style={styles.pickBody}>
        <Text style={[styles.cat, { color: accent }]}>{categoryLabels[product.cat]}</Text>
        <Text style={styles.pickTitle} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.merchant} numberOfLines={1}>{product.merchant}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.was}>{won(product.price)}</Text>
          <Text style={styles.now}>{won(price)}</Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

export function DealCard({
  product,
  onPress,
  gridWidth,
}: {
  product: Product;
  onPress: () => void;
  gridWidth?: boolean;
}) {
  const price = finalPrice(product.price, product.coinPct);
  const accent = categoryAccents[product.cat];
  return (
    <AnimatedPressable style={[styles.dealCard, gridWidth && styles.dealCardGrid]} onPress={onPress}>
      <View style={styles.dealThumbWrap}>
        <Image source={{ uri: imgUrl(product.image, 220) }} style={styles.dealThumb} resizeMode="cover" />
        <View style={[styles.badge, styles.badgeSmall, { backgroundColor: colors.coral }]}>
          <Text style={styles.badgeText}>-{product.coinPct}%</Text>
        </View>
      </View>
      <View style={styles.dealInfo}>
        <Text style={[styles.cat, { color: accent }]}>{categoryLabels[product.cat]}</Text>
        <Text style={styles.dealTitle} numberOfLines={2}>{product.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta} numberOfLines={1}>📍 {product.loc}</Text>
          <View style={styles.ratingRow}>
            <StarIcon size={10} />
            <Text style={styles.meta}>{product.rating}</Text>
          </View>
        </View>
        <View style={styles.dealBottom}>
          <View style={styles.priceRow}>
            <Text style={styles.was}>{won(product.price)}</Text>
            <Text style={styles.now}>{won(price)}</Text>
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  pickCard: {
    width: 180,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    overflow: 'hidden',
    ...shadows.card,
  },
  pickThumbWrap: { height: 132, position: 'relative', backgroundColor: colors.paper },
  pickThumb: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute', top: 10, left: 10,
    paddingVertical: 4, paddingHorizontal: 9, borderRadius: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 4,
  },
  badgeSmall: { top: 8, left: 8 },
  badgeText: { color: colors.white, fontSize: 11, fontFamily: fonts.sansExtraBold, letterSpacing: 0.2 },
  pickBody: { padding: 12, paddingTop: 10, paddingBottom: 13 },
  cat: { fontSize: 9.5, textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: fonts.sansBold },
  pickTitle: { fontSize: 13, fontFamily: fonts.sansExtraBold, color: colors.ink, marginTop: 3, marginBottom: 2, lineHeight: 16.5 },
  merchant: { fontSize: 10.5, color: colors.inkSoft, fontFamily: fonts.sans },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5, marginTop: 8 },
  was: { color: '#9AA79D', textDecorationLine: 'line-through', fontFamily: fonts.mono, fontSize: 10.5 },
  now: { fontFamily: fonts.monoSemiBold, fontSize: 12.5, color: colors.jadeDeep },

  dealCard: {
    backgroundColor: colors.white, borderRadius: radii.xl, overflow: 'hidden', ...shadows.card,
  },
  dealCardGrid: { width: '100%' },
  dealThumbWrap: { height: 150, position: 'relative', backgroundColor: colors.paper },
  dealThumb: { width: '100%', height: '100%' },
  dealInfo: { padding: 13, paddingTop: 11 },
  dealTitle: { fontSize: 14.5, fontFamily: fonts.sansExtraBold, color: colors.ink, marginTop: 3, marginBottom: 3, lineHeight: 18 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  meta: { fontSize: 11, color: colors.inkSoft, fontFamily: fonts.sans },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  dealBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 9 },
});
