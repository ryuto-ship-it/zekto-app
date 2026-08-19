import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, radii, categoryLabels } from '../theme/theme';
import { won, finalPrice, imgUrl } from '../utils/format';
import { Product } from '../data/products';
import { StarIcon } from './Icons';

export function PickCard({ product, onPress }: { product: Product; onPress: () => void }) {
  const price = finalPrice(product.price, product.coinPct);
  return (
    <Pressable style={styles.pickCard} onPress={onPress}>
      <View style={styles.pickThumbWrap}>
        <Image source={{ uri: imgUrl(product.image, 344) }} style={styles.pickThumb} resizeMode="cover" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>-{product.coinPct}%</Text>
        </View>
      </View>
      <View style={styles.pickBody}>
        <Text style={styles.cat}>{categoryLabels[product.cat]}</Text>
        <Text style={styles.pickTitle} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.merchant} numberOfLines={1}>{product.merchant}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.was}>{won(product.price)}</Text>
          <Text style={styles.now}>{won(price)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export function DealCard({ product, onPress }: { product: Product; onPress: () => void }) {
  const price = finalPrice(product.price, product.coinPct);
  return (
    <Pressable style={styles.dealCard} onPress={onPress}>
      <Image source={{ uri: imgUrl(product.image, 160) }} style={styles.dealThumb} resizeMode="cover" />
      <View style={styles.dealInfo}>
        <Text style={styles.cat}>{categoryLabels[product.cat]}</Text>
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
          <View style={styles.saveTag}>
            <Text style={styles.saveTagText}>-{product.coinPct}% coin</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pickCard: {
    width: 172,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  pickThumbWrap: { height: 96, position: 'relative', backgroundColor: colors.paper },
  pickThumb: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute', top: 8, left: 8, backgroundColor: colors.coral,
    paddingVertical: 3, paddingHorizontal: 7, borderRadius: 6,
  },
  badgeText: { color: colors.white, fontSize: 9.5, fontFamily: fonts.sansBold, letterSpacing: 0.2 },
  pickBody: { padding: 11, paddingTop: 10, paddingBottom: 12 },
  cat: { fontSize: 9.5, textTransform: 'uppercase', letterSpacing: 0.8, color: colors.jade, fontFamily: fonts.sansBold },
  pickTitle: { fontSize: 12.5, fontFamily: fonts.sansBold, color: colors.ink, marginTop: 3, marginBottom: 2, lineHeight: 16 },
  merchant: { fontSize: 10.5, color: colors.inkSoft, fontFamily: fonts.sans },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5, marginTop: 8 },
  was: { color: '#9AA79D', textDecorationLine: 'line-through', fontFamily: fonts.mono, fontSize: 10.5 },
  now: { fontFamily: fonts.monoSemiBold, fontSize: 12, color: colors.jadeDeep },

  dealCard: {
    flexDirection: 'row', gap: 12, backgroundColor: colors.white, borderWidth: 1,
    borderColor: colors.line, borderRadius: radii.lg, padding: 12,
  },
  dealThumb: { width: 74, height: 74, borderRadius: 12, backgroundColor: colors.paper },
  dealInfo: { flex: 1, minWidth: 0 },
  dealTitle: { fontSize: 13.5, fontFamily: fonts.sansBold, color: colors.ink, marginTop: 2, marginBottom: 2, lineHeight: 17 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  meta: { fontSize: 11, color: colors.inkSoft, fontFamily: fonts.sans },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  dealBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  saveTag: { backgroundColor: colors.coralTint, paddingVertical: 2, paddingHorizontal: 7, borderRadius: 6 },
  saveTagText: { color: colors.coral, fontSize: 10, fontFamily: fonts.sansBold },
});
