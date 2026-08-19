import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function TopBar() {
  const { balance } = useApp();
  return (
    <View style={styles.topbar}>
      <View>
        <Text style={styles.wordmark}>ZEKTO</Text>
        <Text style={styles.loc}>📍 Seoul, KR</Text>
      </View>
      <View style={styles.balanceChip}>
        <View style={styles.dot} />
        <Text style={styles.balanceText}>
          {balance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USDT
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 14,
    backgroundColor: colors.paper,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  wordmark: { fontFamily: fonts.serifBold, fontSize: 22, color: colors.jadeDeep, letterSpacing: -0.2 },
  loc: { fontSize: 11.5, color: colors.inkSoft, marginTop: 2, fontFamily: fonts.sans },
  balanceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.jadeDeep,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.gold },
  balanceText: { color: colors.goldTint, fontSize: 12.5, fontFamily: fonts.monoMedium },
});
