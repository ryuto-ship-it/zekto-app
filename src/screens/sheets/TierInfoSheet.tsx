import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Circle } from 'react-native-svg';
import { colors, fonts, radii, shadows } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import { won } from '../../utils/format';
import { LockIcon } from '../../components/Icons';
import Sheet from '../../components/Sheet';
import { RootStackParamList } from '../../navigation/types';
import { Tier, TIERS, nextTier, amountToNextTier } from '../../data/tiers';

const CARD_WIDTH = 236;
const CARD_GAP = 12;
const SNAP = CARD_WIDTH + CARD_GAP;
const RING_SIZE = 92;
const RING_STROKE = 9;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

function spendRangeLabel(tier: Tier) {
  if (tier.maxSpend === null) return `${won(tier.minSpend)}+`;
  return `${won(tier.minSpend)} – ${won(tier.maxSpend)}`;
}

function TierCard({ tier, currentTier }: { tier: Tier; currentTier: Tier }) {
  const isCurrent = tier.id === currentTier.id;
  const isUnlocked = TIERS.findIndex((t) => t.id === tier.id) <= TIERS.findIndex((t) => t.id === currentTier.id);
  const isLocked = !isUnlocked;

  return (
    <View
      style={[
        styles.card,
        isCurrent && styles.cardCurrent,
        isLocked && styles.cardLocked,
      ]}
    >
      <View style={styles.cardTopRow}>
        <Text style={styles.cardEmoji}>{tier.emoji}</Text>
        {isCurrent ? (
          <View style={[styles.badge, styles.badgeCurrent]}>
            <Text style={styles.badgeCurrentText}>CURRENT TIER</Text>
          </View>
        ) : isLocked ? (
          <View style={[styles.badge, styles.badgeLocked]}>
            <LockIcon size={10} color={colors.inkSoft} />
            <Text style={styles.badgeLockedText}>LOCKED</Text>
          </View>
        ) : (
          <View style={[styles.badge, styles.badgeUnlocked]}>
            <Text style={styles.badgeUnlockedText}>✓ UNLOCKED</Text>
          </View>
        )}
      </View>

      <Text style={styles.cardLabel}>{tier.label}</Text>
      <Text style={styles.cardRange}>{spendRangeLabel(tier)}</Text>

      <View style={styles.cardDivider} />

      <View style={styles.cardStatRow}>
        <Text style={styles.cardStatLabel}>Earn rate</Text>
        <Text style={styles.cardStatValue}>{Math.round(tier.earnRate * 1000) / 10}%</Text>
      </View>
      <View style={styles.cardStatRow}>
        <Text style={styles.cardStatLabel}>Bonus discount</Text>
        <Text style={styles.cardStatValue}>+{tier.discountBonusPct}%p</Text>
      </View>

      <View style={[styles.perkChip, !tier.perk && styles.perkChipEmpty]}>
        <Text style={[styles.perkChipText, !tier.perk && styles.perkChipTextEmpty]}>
          {tier.perk ?? 'No exclusive perk at this tier'}
        </Text>
      </View>
    </View>
  );
}

function ProgressRing({ percent }: { percent: number }) {
  const offset = RING_CIRC * (1 - percent / 100);
  return (
    <View style={styles.ringWrap}>
      <Svg width={RING_SIZE} height={RING_SIZE}>
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          stroke={colors.primaryTint}
          strokeWidth={RING_STROKE}
          fill="none"
        />
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          stroke={colors.primary}
          strokeWidth={RING_STROKE}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${RING_CIRC}, ${RING_CIRC}`}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
        />
      </Svg>
      <View style={styles.ringCenter}>
        <Text style={styles.ringPct}>{percent}%</Text>
      </View>
    </View>
  );
}

export default function TierInfoSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tier, lifetimeSpend } = useApp();
  const next = nextTier(tier);
  const remaining = amountToNextTier(lifetimeSpend);
  const progressPct = next
    ? Math.min(100, Math.round(((lifetimeSpend - tier.minSpend) / (next.minSpend - tier.minSpend)) * 100))
    : 100;

  const currentIndex = TIERS.findIndex((t) => t.id === tier.id);
  const [activeIndex, setActiveIndex] = useState(Math.max(0, currentIndex));
  const listRef = useRef<FlatList<Tier>>(null);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SNAP);
    setActiveIndex(Math.max(0, Math.min(TIERS.length - 1, idx)));
  };

  return (
    <Sheet onClose={() => navigation.goBack()}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{tier.emoji}</Text>
        <Text style={styles.h2}>{tier.label} Member</Text>
        <Text style={styles.subhead}>{won(lifetimeSpend)} spent lifetime</Text>
      </View>

      <FlatList
        ref={listRef}
        data={TIERS}
        keyExtractor={(t) => t.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 4 }}
        ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
        getItemLayout={(_, index) => ({ length: SNAP, offset: index * SNAP, index })}
        initialScrollIndex={Math.max(0, currentIndex)}
        onMomentumScrollEnd={onMomentumEnd}
        renderItem={({ item }) => <TierCard tier={item} currentTier={tier} />}
        style={{ marginTop: 14 }}
      />

      <View style={styles.dotsRow}>
        {TIERS.map((t, i) => (
          <View key={t.id} style={[styles.dot, i === activeIndex && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.progressCard}>
        {next ? (
          <View style={styles.progressRow}>
            <ProgressRing percent={progressPct} />
            <View style={styles.progressTextCol}>
              <Text style={styles.progressHeadline}>
                {won(remaining)} until {next.label} {next.emoji}
              </Text>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${progressPct}%` }]} />
              </View>
              <Text style={styles.progressSub}>{progressPct}% of the way there</Text>
            </View>
          </View>
        ) : (
          <View style={styles.maxTierRow}>
            <Text style={styles.maxTierEmoji}>🏆</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.maxTierTitle}>Highest tier reached</Text>
              <Text style={styles.maxTierSub}>
                You've unlocked every FuturePass perk — {tier.earnRate * 100}% earn rate and all Platinum benefits.
              </Text>
            </View>
          </View>
        )}
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 6 },
  emoji: { fontSize: 40 },
  h2: { fontFamily: fonts.serifMedium, fontSize: 19, color: colors.ink, marginTop: 6 },
  subhead: { fontSize: 12, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans },

  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 16,
    borderWidth: 1.5,
    borderColor: colors.line,
    ...shadows.card,
  },
  cardCurrent: { borderColor: colors.primary, backgroundColor: colors.primaryTint },
  cardLocked: { opacity: 0.62 },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardEmoji: { fontSize: 26 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingVertical: 3, paddingHorizontal: 7, borderRadius: radii.pill },
  badgeCurrent: { backgroundColor: colors.primary },
  badgeCurrentText: { fontSize: 8.5, letterSpacing: 0.4, color: colors.white, fontFamily: fonts.sansBold },
  badgeLocked: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line },
  badgeLockedText: { fontSize: 8.5, letterSpacing: 0.4, color: colors.inkSoft, fontFamily: fonts.sansBold },
  badgeUnlocked: { backgroundColor: colors.emeraldTint },
  badgeUnlockedText: { fontSize: 8.5, letterSpacing: 0.4, color: colors.emerald, fontFamily: fonts.sansBold },
  cardLabel: { fontFamily: fonts.serifMedium, fontSize: 20, color: colors.ink, marginTop: 10 },
  cardRange: { fontSize: 11.5, color: colors.inkSoft, marginTop: 2, fontFamily: fonts.monoMedium },
  cardDivider: { height: 1, backgroundColor: colors.line, marginTop: 12, marginBottom: 10 },
  cardStatRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  cardStatLabel: { fontSize: 11.5, color: colors.inkSoft, fontFamily: fonts.sansMedium },
  cardStatValue: { fontSize: 12, color: colors.ink, fontFamily: fonts.monoMedium },
  perkChip: { marginTop: 8, backgroundColor: colors.goldTint, borderRadius: radii.md, paddingVertical: 8, paddingHorizontal: 10, minHeight: 42, justifyContent: 'center' },
  perkChipEmpty: { backgroundColor: colors.paper },
  perkChipText: { fontSize: 11, color: '#7A6023', fontFamily: fonts.sansBold, lineHeight: 15 },
  perkChipTextEmpty: { color: colors.inkSoft, fontFamily: fonts.sansMedium },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.line },
  dotActive: { width: 16, backgroundColor: colors.primary },

  progressCard: {
    marginHorizontal: 20, marginTop: 16, backgroundColor: colors.white, borderRadius: radii.lg,
    padding: 14, ...shadows.card,
  },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  ringWrap: { width: RING_SIZE, height: RING_SIZE, alignItems: 'center', justifyContent: 'center' },
  ringCenter: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  ringPct: { fontFamily: fonts.monoSemiBold, fontSize: 15, color: colors.primary },
  progressTextCol: { flex: 1 },
  progressHeadline: { fontSize: 12.5, color: colors.ink, fontFamily: fonts.sansBold, marginBottom: 8 },
  progressBarTrack: { height: 7, borderRadius: 4, backgroundColor: colors.primaryTint, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  progressSub: { fontSize: 10.5, color: colors.inkSoft, marginTop: 6, fontFamily: fonts.sansMedium },

  maxTierRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  maxTierEmoji: { fontSize: 32 },
  maxTierTitle: { fontSize: 14, color: colors.ink, fontFamily: fonts.sansBold },
  maxTierSub: { fontSize: 11.5, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans, lineHeight: 16 },
});
