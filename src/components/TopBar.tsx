import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radii, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export default function TopBar() {
  const { balance, activeRegionName } = useApp();
  return (
    <View style={styles.topbar}>
      <View>
        <Text style={styles.wordmark}>FuturePass</Text>
        <Text style={styles.loc}>📍 {activeRegionName ? `${activeRegionName}, Seoul` : 'Seoul, KR'}</Text>
      </View>
      <LinearGradient
        colors={[colors.gold, colors.goldLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.balanceChip}
      >
        <Text style={styles.balanceText}>
          {balance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USDT
        </Text>
      </LinearGradient>
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
  wordmark: { fontFamily: fonts.serifBold, fontSize: 21, color: colors.primary, letterSpacing: -0.2 },
  loc: { fontSize: 11.5, color: colors.inkSoft, marginTop: 2, fontFamily: fonts.sans },
  balanceChip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    ...shadows.floating,
  },
  balanceText: { color: '#2B1B03', fontSize: 12.5, fontFamily: fonts.monoMedium, fontWeight: '700' },
});
