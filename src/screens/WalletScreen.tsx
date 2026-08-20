import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii } from '../theme/theme';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { won } from '../utils/format';
import PassCard from '../components/PassCard';
import { RootStackParamList } from '../navigation/types';

export default function WalletScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { purchased, redeemedCount, totalSaved, resoldCount, cancelResale, resaleListings, totalUnreadMessages } = useApp();
  const showToast = useToast();
  const mySalesCount = resaleListings.filter((l) => l.ownPassUid !== undefined).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.head}>
        <Text style={styles.h1}>My Passes</Text>
        <Text style={styles.sub}>Everything you've pre-purchased, ready to use in Korea.</Text>
      </View>

      {mySalesCount > 0 ? (
        <Pressable style={styles.mySalesBtn} onPress={() => navigation.navigate('MySales')}>
          <View style={styles.mySalesIcon}>
            <Text style={styles.mySalesIconText}>🔁</Text>
          </View>
          <View style={styles.mySalesInfo}>
            <Text style={styles.mySalesTitle}>My Sales</Text>
            <Text style={styles.mySalesSub}>{mySalesCount} listing{mySalesCount === 1 ? '' : 's'} · views, likes & chats</Text>
          </View>
          {totalUnreadMessages > 0 ? (
            <View style={styles.mySalesBadge}>
              <Text style={styles.mySalesBadgeText}>{totalUnreadMessages}</Text>
            </View>
          ) : null}
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      ) : null}

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{purchased.length}</Text>
          <Text style={styles.statLabel}>PASSES OWNED</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{redeemedCount}</Text>
          <Text style={styles.statLabel}>REDEEMED</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{won(totalSaved)}</Text>
          <Text style={styles.statLabel}>TOTAL SAVED</Text>
        </View>
        {resoldCount > 0 ? (
          <View style={styles.stat}>
            <Text style={styles.statNum}>{resoldCount}</Text>
            <Text style={styles.statLabel}>RESOLD</Text>
          </View>
        ) : null}
      </View>

      {purchased.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No passes yet</Text>
          <Text style={styles.emptyText}>
            Browse Beauty, Hotel, and Dining benefits on Discover and pre-buy with stablecoin to see them here.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {purchased.map((p) => (
            <PassCard
              key={p.uid}
              pass={p}
              onPress={() => navigation.navigate('QRCode', { passUid: p.uid })}
              onResell={() => navigation.navigate('Resell', { passUid: p.uid })}
              onCancelResale={() => {
                cancelResale(p.uid);
                showToast('Resale listing cancelled');
              }}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: 32 },
  head: { marginHorizontal: 20, marginTop: 16, marginBottom: 4 },
  h1: { fontFamily: fonts.serif, fontSize: 21, color: colors.ink },
  sub: { fontSize: 12.5, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans },
  mySalesBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 20, marginTop: 14,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: radii.lg, padding: 13,
  },
  mySalesIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.goldTint, alignItems: 'center', justifyContent: 'center' },
  mySalesIconText: { fontSize: 17 },
  mySalesInfo: { flex: 1, minWidth: 0 },
  mySalesTitle: { fontSize: 13.5, fontFamily: fonts.sansExtraBold, color: colors.ink },
  mySalesSub: { fontSize: 10.5, color: colors.inkSoft, marginTop: 2, fontFamily: fonts.sans },
  mySalesBadge: { minWidth: 20, height: 20, borderRadius: 10, backgroundColor: colors.coral, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  mySalesBadgeText: { color: colors.white, fontSize: 10.5, fontFamily: fonts.sansBold },
  chevron: { fontSize: 20, color: colors.inkSoft, marginLeft: 2 },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginHorizontal: 20, marginVertical: 14 },
  stat: { flexGrow: 1, flexBasis: '30%', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: radii.lg, padding: 12 },
  statNum: { fontFamily: fonts.monoSemiBold, fontSize: 16, color: colors.primary },
  statLabel: { fontSize: 9.5, color: colors.inkSoft, marginTop: 4, letterSpacing: 0.3, fontFamily: fonts.sansMedium },
  list: { paddingHorizontal: 20, gap: 12 },
  empty: { marginHorizontal: 30, marginTop: 60, alignItems: 'center' },
  emptyTitle: { fontFamily: fonts.serif, fontSize: 17, color: colors.ink, marginBottom: 6 },
  emptyText: { fontSize: 12.5, color: colors.inkSoft, lineHeight: 19, textAlign: 'center' },
});
