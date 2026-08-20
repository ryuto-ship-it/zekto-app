import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, radii, shadows, categoryLabels, categoryAccents } from '../theme/theme';
import { Pass } from '../context/AppContext';
import { imgUrl, won } from '../utils/format';

export default function PassCard({
  pass,
  onPress,
  onResell,
  onCancelResale,
}: {
  pass: Pass;
  onPress: () => void;
  onResell: () => void;
  onCancelResale: () => void;
}) {
  const listed = pass.resaleStatus === 'listed';
  return (
    <Pressable style={[styles.card, pass.used && styles.cardUsed]} onPress={onPress}>
      <View style={styles.top}>
        <Image source={{ uri: imgUrl(pass.image, 120) }} style={styles.thumb} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={[styles.cat, { color: categoryAccents[pass.cat] }]}>{categoryLabels[pass.cat]}</Text>
          <Text style={styles.title} numberOfLines={2}>{pass.title}</Text>
          <Text style={styles.merchant} numberOfLines={1}>{pass.merchant}</Text>
        </View>
        <View
          style={[
            styles.status,
            pass.used ? styles.statusUsed : listed ? styles.statusListed : styles.statusValid,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              pass.used ? styles.statusTextUsed : listed ? styles.statusTextListed : styles.statusTextValid,
            ]}
          >
            {pass.used ? 'USED' : listed ? 'LISTED' : 'VALID'}
          </Text>
        </View>
      </View>
      <View style={styles.verifiedRow}>
        <Text style={styles.verifiedText}>⛓ Verified · on-chain issued</Text>
        {listed && pass.resalePrice ? <Text style={styles.listedPrice}>Asking {won(pass.resalePrice)}</Text> : null}
      </View>
      <View style={styles.perforation}>
        <View style={styles.perfLine} />
        <View style={[styles.perfHole, styles.perfHoleLeft]} />
        <View style={[styles.perfHole, styles.perfHoleRight]} />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>Valid 90 days</Text>
        <Text style={styles.code}>{pass.code}</Text>
      </View>
      {!pass.used ? (
        <View style={styles.actionRow}>
          {listed ? (
            <Pressable style={styles.actionBtn} onPress={onCancelResale} hitSlop={6}>
              <Text style={styles.actionBtnText}>Cancel listing</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.actionBtn} onPress={onResell} hitSlop={6}>
              <Text style={styles.actionBtnText}>Resell</Text>
            </Pressable>
          )}
        </View>
      ) : null}
    </Pressable>
  );
}

const HOLE = 16;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    overflow: 'hidden',
    ...shadows.card,
  },
  cardUsed: { opacity: 0.5 },
  top: { flexDirection: 'row', gap: 12, padding: 14, paddingBottom: 12 },
  thumb: { width: 52, height: 52, borderRadius: 10, backgroundColor: colors.paper },
  info: { flex: 1, minWidth: 0 },
  cat: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.6, color: colors.primary, fontFamily: fonts.sansBold },
  title: { fontSize: 13, fontFamily: fonts.sansBold, color: colors.ink, marginTop: 2, marginBottom: 2, lineHeight: 17 },
  merchant: { fontSize: 10.5, color: colors.inkSoft, fontFamily: fonts.sans },
  status: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 6, alignSelf: 'flex-start' },
  statusValid: { backgroundColor: colors.primaryTint },
  statusUsed: { backgroundColor: '#EBE7DC' },
  statusListed: { backgroundColor: colors.goldTint },
  statusText: { fontSize: 10, fontFamily: fonts.sansBold },
  statusTextValid: { color: colors.primary },
  statusTextUsed: { color: '#8A8375' },
  statusTextListed: { color: '#7A6023' },
  verifiedRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 14, marginBottom: 4,
  },
  verifiedText: { fontSize: 9.5, color: colors.primary, fontFamily: fonts.sansBold },
  listedPrice: { fontSize: 9.5, color: '#7A6023', fontFamily: fonts.sansBold },
  perforation: { height: 1, position: 'relative', marginHorizontal: 10 },
  perfLine: { position: 'absolute', left: 0, right: 0, top: 0, borderTopWidth: 1.5, borderColor: colors.line, borderStyle: 'dashed' },
  perfHole: { position: 'absolute', width: HOLE, height: HOLE, borderRadius: HOLE / 2, backgroundColor: colors.paper, top: -HOLE / 2 },
  perfHoleLeft: { left: -HOLE / 2 - 10 },
  perfHoleRight: { right: -HOLE / 2 - 10 },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingTop: 12, paddingBottom: 10 },
  bottomText: { fontSize: 11, color: colors.inkSoft, fontFamily: fonts.sans },
  code: { fontFamily: fonts.monoSemiBold, fontSize: 12, color: colors.primary },
  actionRow: { paddingHorizontal: 14, paddingBottom: 12, flexDirection: 'row' },
  actionBtn: {
    borderWidth: 1, borderColor: colors.line, borderRadius: radii.pill, paddingVertical: 6, paddingHorizontal: 12,
  },
  actionBtnText: { fontSize: 11, fontFamily: fonts.sansBold, color: colors.primary },
});
