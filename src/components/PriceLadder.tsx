import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '../theme/theme';
import { won } from '../utils/format';
import { CardPaymentIcon, CashPaymentIcon, CoinPaymentIcon } from './Icons';

export type LadderRow = {
  label: string;
  amount: number;
  widthPct: number;
  kind: 'card' | 'cash' | 'coin';
};

type Props = {
  rows: LadderRow[];
  variant?: 'hero' | 'detail';
  bestText?: string;
};

function RowIcon({ kind, isHero }: { kind: LadderRow['kind']; isHero: boolean }) {
  const color = isHero ? '#C9D6CE' : colors.inkSoft;
  const coinColor = isHero ? colors.goldLight : colors.gold;
  if (kind === 'card') return <CardPaymentIcon size={12} color={color} />;
  if (kind === 'cash') return <CashPaymentIcon size={12} color={color} />;
  return <CoinPaymentIcon size={12} color={coinColor} />;
}

export default function PriceLadder({ rows, variant = 'hero', bestText }: Props) {
  const isHero = variant === 'hero';
  return (
    <View style={styles.wrap}>
      {rows.map((row) => (
        <View key={row.kind} style={styles.row}>
          <View style={styles.labelRow}>
            <RowIcon kind={row.kind} isHero={isHero} />
            <Text
              style={[
                styles.label,
                isHero ? styles.labelHero : styles.labelDetail,
                !isHero && row.kind === 'coin' && styles.labelCoin,
              ]}
            >
              {row.label}
            </Text>
          </View>
          <View style={[styles.track, isHero ? styles.trackHero : styles.trackDetail]}>
            <View
              style={[
                styles.fill,
                { width: `${row.widthPct}%` },
                fillStyle(row.kind, isHero),
              ]}
            />
          </View>
          <Text style={[styles.amount, isHero ? styles.amountHero : styles.amountDetail, !isHero && row.kind === 'coin' && styles.amountCoin]}>
            {won(row.amount)}
          </Text>
        </View>
      ))}
      {bestText ? (
        <View style={[styles.bestBadge, isHero ? styles.bestBadgeHero : styles.bestBadgeDetail]}>
          <Text style={[styles.bestText, isHero ? styles.bestTextHero : styles.bestTextDetail]}>{bestText}</Text>
        </View>
      ) : null}
    </View>
  );
}

function fillStyle(kind: LadderRow['kind'], isHero: boolean) {
  if (kind === 'coin') return styles.fillCoin;
  if (kind === 'cash') return isHero ? styles.fillCashHero : styles.fillCashDetail;
  return isHero ? styles.fillCardHero : styles.fillCardDetail;
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 0 },
  label: {},
  labelHero: { width: 66, fontSize: 10, color: '#C9D6CE', fontFamily: fonts.sansMedium },
  labelDetail: { width: 68, fontSize: 10, color: colors.inkSoft, fontFamily: fonts.sansSemiBold },
  labelCoin: { color: colors.jadeDeep },
  track: { flex: 1, borderRadius: 5, overflow: 'hidden' },
  trackHero: { height: 6, backgroundColor: 'rgba(255,255,255,0.14)' },
  trackDetail: { height: 6, backgroundColor: colors.paper },
  fill: { height: '100%', borderRadius: 5 },
  fillCardHero: { backgroundColor: '#6C8479' },
  fillCashHero: { backgroundColor: '#8FA79B' },
  fillCardDetail: { backgroundColor: '#B7C4BC' },
  fillCashDetail: { backgroundColor: '#8FA79B' },
  fillCoin: { backgroundColor: colors.gold },
  amount: { flexShrink: 0, fontFamily: fonts.monoSemiBold, textAlign: 'right' },
  amountHero: { width: 72, fontSize: 11, color: '#EDEEE4' },
  amountDetail: { width: 78, fontSize: 12, color: colors.ink },
  amountCoin: { color: colors.jadeDeep },
  bestBadge: { alignSelf: 'flex-start', marginTop: 4, paddingVertical: 4, paddingHorizontal: 10, borderRadius: radii.sm },
  bestBadgeHero: { backgroundColor: colors.gold },
  bestBadgeDetail: { backgroundColor: colors.jadeDeep, marginTop: 8 },
  bestText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
  bestTextHero: { color: colors.jadeDeep },
  bestTextDetail: { color: colors.goldTint },
});
