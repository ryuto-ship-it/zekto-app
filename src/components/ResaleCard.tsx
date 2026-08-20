import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, radii, shadows, categoryLabels, categoryAccents } from '../theme/theme';
import { won, imgUrl } from '../utils/format';
import { ResaleListing } from '../data/resale';
import { AnimatedPressable } from './AnimatedCard';

export function ResaleCard({
  listing,
  onPress,
  onToggleLike,
}: {
  listing: ResaleListing;
  onPress: () => void;
  onToggleLike?: () => void;
}) {
  const pct = Math.round((listing.resalePrice / listing.originalPrice) * 100);
  const accent = categoryAccents[listing.cat];
  return (
    <AnimatedPressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: imgUrl(listing.image, 160) }} style={styles.thumb} resizeMode="cover" />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={[styles.cat, { color: accent }]}>{categoryLabels[listing.cat]}</Text>
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>RESALE</Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>{listing.title}</Text>
        <Text style={styles.seller} numberOfLines={1}>From {listing.sellerLabel}</Text>
        {listing.description ? (
          <Text style={styles.description} numberOfLines={2}>"{listing.description}"</Text>
        ) : null}
        <View style={styles.bottom}>
          <View style={styles.priceRow}>
            <Text style={styles.was}>{won(listing.originalPrice)}</Text>
            <Text style={styles.now}>{won(listing.resalePrice)}</Text>
          </View>
          <View style={styles.pctTag}>
            <Text style={styles.pctTagText}>{pct}% of original</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>👁 {listing.views}</Text>
          <Pressable style={styles.likeBtn} onPress={onToggleLike} hitSlop={8}>
            <Text style={[styles.statText, listing.likedByMe && styles.likedText]}>
              {listing.likedByMe ? '♥' : '♡'} {listing.likes}
            </Text>
          </Pressable>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', gap: 12, backgroundColor: colors.white,
    borderRadius: radii.xl, padding: 12, ...shadows.card,
  },
  thumb: { width: 82, height: 82, borderRadius: 14, backgroundColor: colors.paper },
  info: { flex: 1, minWidth: 0 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cat: { fontSize: 9.5, textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: fonts.sansBold },
  ribbon: { backgroundColor: colors.gold, borderRadius: 5, paddingVertical: 2, paddingHorizontal: 6 },
  ribbonText: { fontSize: 9, fontFamily: fonts.sansBold, color: '#5E4A1A', letterSpacing: 0.4 },
  title: { fontSize: 13.5, fontFamily: fonts.sansExtraBold, color: colors.ink, marginTop: 2, marginBottom: 2, lineHeight: 17 },
  seller: { fontSize: 11, color: colors.inkSoft, fontFamily: fonts.sans },
  description: { fontSize: 10.5, color: colors.inkSoft, fontStyle: 'italic', marginTop: 3, lineHeight: 14 },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  was: { color: '#9AA79D', textDecorationLine: 'line-through', fontFamily: fonts.mono, fontSize: 10.5 },
  now: { fontFamily: fonts.monoSemiBold, fontSize: 12.5, color: colors.primary },
  pctTag: { backgroundColor: colors.goldTint, paddingVertical: 2, paddingHorizontal: 7, borderRadius: 6 },
  pctTagText: { color: '#7A6023', fontSize: 10, fontFamily: fonts.sansBold },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6 },
  likeBtn: { flexDirection: 'row', alignItems: 'center' },
  statText: { fontSize: 10.5, color: colors.inkSoft, fontFamily: fonts.sansMedium },
  likedText: { color: colors.coral, fontFamily: fonts.sansBold },
});
