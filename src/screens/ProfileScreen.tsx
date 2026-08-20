import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii, shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { GlobeIcon, BellIcon, LockIcon, ChatIcon, DocIcon, ChevronRight } from '../components/Icons';
import { RootStackParamList } from '../navigation/types';

const LIST_ITEMS = [
  { key: 'lang', label: 'Language & region', Icon: GlobeIcon },
  { key: 'notif', label: 'Notifications', Icon: BellIcon },
  { key: 'security', label: 'Security & wallet', Icon: LockIcon },
  { key: 'help', label: 'Help & support', Icon: ChatIcon },
  { key: 'terms', label: 'Terms & refund policy', Icon: DocIcon },
];

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { balance, points, tier } = useApp();
  const showToast = useToast();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.head}>
        <LinearGradient colors={['#9B6FE8', '#6C3FC5']} style={styles.avatar} />
        <View>
          <Text style={styles.name}>Declan Murphy</Text>
          <Text style={styles.sub}>Traveler from Dublin, Ireland · Joined Aug 2026</Text>
          <Pressable style={styles.tierBadge} onPress={() => navigation.navigate('TierInfo')}>
            <Text style={styles.tierBadgeText}>{tier.emoji} {tier.label} Member</Text>
            <Text style={styles.tierBadgeChevron}>›</Text>
          </Pressable>
        </View>
      </View>

      <LinearGradient colors={[colors.gold, colors.goldLight]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>STABLECOIN BALANCE</Text>
        <Text style={styles.balanceNum}>{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</Text>
        <View style={styles.balanceRow}>
          <Pressable style={styles.balanceBtn} onPress={() => navigation.navigate('AddFunds')}>
            <Text style={styles.balanceBtnText}>+ Add funds</Text>
          </Pressable>
          <Pressable style={styles.balanceBtn} onPress={() => navigation.navigate('TransactionHistory')}>
            <Text style={styles.balanceBtnText}>Transaction history</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <Pressable onPress={() => navigation.navigate('TierInfo')}>
        <LinearGradient colors={[colors.rose, colors.roseLight]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.pointsCard}>
          <View style={styles.pointsCardLeft}>
            <Text style={styles.pointsLabel}>FUTUREPASS POINTS</Text>
            <Text style={styles.pointsNum}>{points.toLocaleString('en-US')}P</Text>
            <Text style={styles.pointsHint}>Earn {Math.round(tier.earnRate * 1000) / 10}% back on every stablecoin purchase</Text>
          </View>
          <Text style={styles.pointsChevron}>›</Text>
        </LinearGradient>
      </Pressable>

      <View style={styles.list}>
        {LIST_ITEMS.map(({ key, label, Icon }) => (
          <Pressable key={key} style={styles.listItem} onPress={() => showToast(`${label} — coming soon`)}>
            <View style={styles.itemIcon}>
              <Icon size={15} />
            </View>
            <Text style={styles.itemLabel}>{label}</Text>
            <ChevronRight />
          </Pressable>
        ))}
      </View>

      <View style={styles.whyCard}>
        <Text style={styles.whyEyebrow}>WHY FUTUREPASS</Text>
        <Text style={styles.whyText}>
          Connected through the nationwide ZeroPay merchant network — FuturePass plugs straight into 2M+ small
          businesses across Korea with no separate contract per merchant.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: 32 },
  head: { marginHorizontal: 20, marginTop: 22, marginBottom: 18, flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  name: { fontFamily: fonts.serif, fontSize: 18, color: colors.ink },
  sub: { fontSize: 11.5, color: colors.inkSoft, marginTop: 2, fontFamily: fonts.sans },
  tierBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3, alignSelf: 'flex-start', marginTop: 6,
    backgroundColor: colors.goldTint, borderRadius: radii.pill, paddingVertical: 3, paddingHorizontal: 9,
  },
  tierBadgeText: { fontSize: 11, color: '#7A6023', fontFamily: fonts.sansBold },
  tierBadgeChevron: { fontSize: 12, color: '#7A6023' },
  balanceCard: { marginHorizontal: 20, marginBottom: 14, borderRadius: radii.xl, padding: 18, ...shadows.card },
  pointsCard: {
    marginHorizontal: 20, marginBottom: 20, borderRadius: radii.xl, padding: 16,
    flexDirection: 'row', alignItems: 'center', ...shadows.card,
  },
  pointsCardLeft: { flex: 1 },
  pointsLabel: { fontSize: 10.5, color: 'rgba(255,255,255,0.85)', letterSpacing: 0.6, fontFamily: fonts.sansMedium },
  pointsNum: { fontFamily: fonts.monoSemiBold, fontSize: 22, color: colors.white, marginTop: 4 },
  pointsHint: { fontSize: 10.5, color: 'rgba(255,255,255,0.9)', marginTop: 5, fontFamily: fonts.sans },
  pointsChevron: { fontSize: 22, color: colors.white },
  balanceLabel: { fontSize: 11, color: 'rgba(31,20,4,0.65)', letterSpacing: 0.6, fontFamily: fonts.sansMedium },
  balanceNum: { fontFamily: fonts.monoSemiBold, fontSize: 26, color: '#2B1B03', marginTop: 4, marginBottom: 12 },
  balanceRow: { flexDirection: 'row', gap: 10 },
  balanceBtn: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.35)', borderWidth: 1, borderColor: 'rgba(43,27,3,0.18)',
    paddingVertical: 9, borderRadius: 10, alignItems: 'center',
  },
  balanceBtnText: { color: '#2B1B03', fontSize: 12, fontFamily: fonts.sansBold },
  list: { marginHorizontal: 20 },
  listItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: colors.line,
  },
  itemIcon: { width: 30, height: 30, borderRadius: 9, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  itemLabel: { flex: 1, fontSize: 13, color: colors.ink, fontFamily: fonts.sansMedium },
  whyCard: {
    marginHorizontal: 20, marginTop: 20, backgroundColor: colors.white, borderRadius: radii.lg, padding: 16, ...shadows.floating,
  },
  whyEyebrow: { fontSize: 10.5, letterSpacing: 1, color: colors.primary, fontFamily: fonts.sansBold, marginBottom: 6 },
  whyText: { fontSize: 12.5, color: colors.inkSoft, lineHeight: 19, fontFamily: fonts.sans },
});
