import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii, shadows } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import { won } from '../../utils/format';
import Sheet from '../../components/Sheet';
import { RootStackParamList } from '../../navigation/types';
import { TIERS, nextTier, amountToNextTier } from '../../data/tiers';

export default function TierInfoSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tier, lifetimeSpend } = useApp();
  const next = nextTier(tier);
  const remaining = amountToNextTier(lifetimeSpend);
  const progressPct = next
    ? Math.min(100, Math.round(((lifetimeSpend - tier.minSpend) / (next.minSpend - tier.minSpend)) * 100))
    : 100;

  return (
    <Sheet onClose={() => navigation.goBack()}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{tier.emoji}</Text>
        <Text style={styles.h2}>{tier.label} Member</Text>
        <Text style={styles.subhead}>{won(lifetimeSpend)} spent lifetime</Text>
      </View>

      <View style={styles.progressCard}>
        {next ? (
          <>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {won(remaining)} until {next.label} {next.emoji}
            </Text>
          </>
        ) : (
          <Text style={styles.progressText}>You've reached the highest tier 🎉</Text>
        )}
      </View>

      <Text style={styles.cap}>Tier benefits</Text>
      <View style={styles.table}>
        <View style={styles.tableHeadRow}>
          <Text style={[styles.th, styles.colTier]}>Tier</Text>
          <Text style={[styles.th, styles.colVal]}>Earn rate</Text>
          <Text style={[styles.th, styles.colVal]}>Bonus discount</Text>
        </View>
        {TIERS.map((t) => {
          const active = t.id === tier.id;
          return (
            <View key={t.id} style={[styles.tableRow, active && styles.tableRowActive]}>
              <View style={[styles.colTier, styles.tierCell]}>
                <Text style={styles.tierEmoji}>{t.emoji}</Text>
                <Text style={[styles.tierName, active && styles.tierNameActive]}>{t.label}</Text>
              </View>
              <Text style={[styles.td, styles.colVal]}>{Math.round(t.earnRate * 100 * 10) / 10}%</Text>
              <Text style={[styles.td, styles.colVal]}>+{t.discountBonusPct}%p</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.perkList}>
        {TIERS.filter((t) => t.perk).map((t) => (
          <View key={t.id} style={styles.perkRow}>
            <Text style={styles.perkEmoji}>{t.emoji}</Text>
            <Text style={styles.perkText}>{t.perk}</Text>
          </View>
        ))}
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 6 },
  emoji: { fontSize: 40 },
  h2: { fontFamily: fonts.serifMedium, fontSize: 19, color: colors.ink, marginTop: 6 },
  subhead: { fontSize: 12, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans },
  progressCard: {
    marginHorizontal: 20, marginTop: 16, backgroundColor: colors.white, borderRadius: radii.lg,
    padding: 14, ...shadows.card,
  },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: colors.primaryTint, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  progressText: { fontSize: 11.5, color: colors.inkSoft, marginTop: 8, fontFamily: fonts.sansMedium, textAlign: 'center' },
  cap: {
    marginHorizontal: 20, marginTop: 20, marginBottom: 8, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5,
    color: colors.inkSoft, fontFamily: fonts.sansBold,
  },
  table: { marginHorizontal: 20, backgroundColor: colors.white, borderRadius: radii.lg, overflow: 'hidden', ...shadows.card },
  tableHeadRow: { flexDirection: 'row', backgroundColor: colors.paper, paddingVertical: 8, paddingHorizontal: 12 },
  th: { fontSize: 9.5, color: colors.inkSoft, fontFamily: fonts.sansBold, textTransform: 'uppercase', letterSpacing: 0.3 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderTopWidth: 1, borderTopColor: colors.line },
  tableRowActive: { backgroundColor: colors.primaryTint },
  colTier: { flex: 1.3 },
  colVal: { flex: 1, textAlign: 'right' },
  tierCell: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tierEmoji: { fontSize: 14 },
  tierName: { fontSize: 12.5, color: colors.ink, fontFamily: fonts.sansMedium },
  tierNameActive: { color: colors.primary, fontFamily: fonts.sansBold },
  td: { fontSize: 12, color: colors.ink, fontFamily: fonts.monoMedium },
  perkList: { marginHorizontal: 20, marginTop: 14, marginBottom: 6, gap: 8 },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.goldTint, borderRadius: radii.md, paddingVertical: 8, paddingHorizontal: 12 },
  perkEmoji: { fontSize: 15 },
  perkText: { flex: 1, fontSize: 11.5, color: '#7A6023', fontFamily: fonts.sansBold },
});
