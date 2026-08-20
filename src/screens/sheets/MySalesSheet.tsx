import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii, shadows } from '../../theme/theme';
import { won } from '../../utils/format';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import Sheet from '../../components/Sheet';
import { RootStackParamList } from '../../navigation/types';
import { RESALE_PRESET_PCTS } from '../../data/resale';

export default function MySalesSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { resaleListings, updateListingPrice, bumpListing, cancelResale } = useApp();
  const showToast = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);

  const mine = resaleListings.filter((l) => l.ownPassUid !== undefined);

  return (
    <Sheet onClose={() => navigation.goBack()}>
      <View style={styles.header}>
        <Text style={styles.h2}>My Sales</Text>
        <Text style={styles.subhead}>
          {mine.length} listing{mine.length === 1 ? '' : 's'} · views, likes & buyer chats
        </Text>
      </View>

      {mine.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Nothing listed yet</Text>
          <Text style={styles.emptyText}>Resell a pass from My Passes and it'll show up here with live stats.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {mine.map((l) => {
            const totalUnread = l.chats.reduce((s, c) => s + c.unread, 0);
            const editing = editingId === l.id;
            const sold = l.status === 'sold';
            return (
              <View key={l.id} style={styles.card}>
                <View style={styles.topRow}>
                  <Text style={styles.title} numberOfLines={1}>{l.title}</Text>
                  <View style={[styles.badge, sold ? styles.badgeSold : styles.badgeActive]}>
                    <Text style={[styles.badgeText, sold ? styles.badgeTextSold : styles.badgeTextActive]}>
                      {sold ? 'SOLD' : 'ACTIVE'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.price}>{won(l.resalePrice)}</Text>

                <View style={styles.statsRow}>
                  <Text style={styles.stat}>👁 {l.views} views</Text>
                  <Text style={styles.stat}>♥ {l.likes} likes</Text>
                  <Pressable
                    style={styles.chatStat}
                    onPress={() => navigation.navigate('ChatList', { listingId: l.id })}
                    hitSlop={6}
                  >
                    <Text style={styles.stat}>💬 {l.chats.length} {l.chats.length === 1 ? 'inquiry' : 'inquiries'}</Text>
                    {totalUnread > 0 ? (
                      <View style={styles.unreadDot}>
                        <Text style={styles.unreadDotText}>{totalUnread}</Text>
                      </View>
                    ) : null}
                  </Pressable>
                </View>

                {!sold ? (
                  <>
                    <View style={styles.actionRow}>
                      <Pressable style={styles.actionBtn} onPress={() => setEditingId(editing ? null : l.id)}>
                        <Text style={styles.actionBtnText}>Edit price</Text>
                      </Pressable>
                      <Pressable
                        style={styles.actionBtn}
                        onPress={() => {
                          bumpListing(l.id);
                          showToast('⬆ Bumped to the top of Resale');
                        }}
                      >
                        <Text style={styles.actionBtnText}>Bump</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.actionBtn, styles.dangerBtn]}
                        onPress={() => {
                          if (l.ownPassUid !== undefined) cancelResale(l.ownPassUid);
                          showToast('Listing taken down');
                        }}
                      >
                        <Text style={[styles.actionBtnText, styles.dangerBtnText]}>Take down</Text>
                      </Pressable>
                    </View>
                    {editing ? (
                      <View style={styles.editRow}>
                        {RESALE_PRESET_PCTS.map((p) => {
                          const price = Math.round((l.originalPrice * p) / 1000) * 1000;
                          return (
                            <Pressable
                              key={p}
                              style={styles.presetBtn}
                              onPress={() => {
                                updateListingPrice(l.id, price);
                                setEditingId(null);
                                showToast('✓ Price updated');
                              }}
                            >
                              <Text style={styles.presetPct}>{Math.round(p * 100)}%</Text>
                              <Text style={styles.presetPrice}>{won(price)}</Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    ) : null}
                  </>
                ) : null}
              </View>
            );
          })}
        </View>
      )}
    </Sheet>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 10 },
  h2: { fontFamily: fonts.serifMedium, fontSize: 18, color: colors.ink },
  subhead: { fontSize: 12.5, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans },
  empty: { marginHorizontal: 30, marginTop: 30, marginBottom: 20, alignItems: 'center' },
  emptyTitle: { fontFamily: fonts.serif, fontSize: 16, color: colors.ink, marginBottom: 6 },
  emptyText: { fontSize: 12.5, color: colors.inkSoft, lineHeight: 19, textAlign: 'center' },
  list: { paddingHorizontal: 20, gap: 12 },
  card: { backgroundColor: colors.white, borderRadius: radii.xl, padding: 14, ...shadows.card },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  title: { flex: 1, fontSize: 13.5, fontFamily: fonts.sansExtraBold, color: colors.ink },
  badge: { borderRadius: 6, paddingVertical: 3, paddingHorizontal: 8 },
  badgeActive: { backgroundColor: colors.primaryTint },
  badgeSold: { backgroundColor: '#EBE7DC' },
  badgeText: { fontSize: 9.5, fontFamily: fonts.sansBold, letterSpacing: 0.4 },
  badgeTextActive: { color: colors.primary },
  badgeTextSold: { color: '#8A8375' },
  price: { fontFamily: fonts.monoSemiBold, fontSize: 15, color: colors.ink, marginTop: 6 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 10 },
  chatStat: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  stat: { fontSize: 11, color: colors.inkSoft, fontFamily: fonts.sansMedium },
  unreadDot: { minWidth: 16, height: 16, borderRadius: 8, backgroundColor: colors.coral, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
  unreadDotText: { color: colors.white, fontSize: 9.5, fontFamily: fonts.sansBold },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  actionBtn: { flex: 1, borderWidth: 1, borderColor: colors.line, borderRadius: radii.pill, paddingVertical: 8, alignItems: 'center' },
  actionBtnText: { fontSize: 11, fontFamily: fonts.sansBold, color: colors.primary },
  dangerBtn: { borderColor: '#F6D3D3' },
  dangerBtnText: { color: colors.coral },
  editRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  presetBtn: { flex: 1, borderWidth: 1.5, borderColor: colors.line, borderRadius: 12, paddingVertical: 8, alignItems: 'center', backgroundColor: colors.paper },
  presetPct: { fontFamily: fonts.monoSemiBold, fontSize: 12, color: colors.ink },
  presetPrice: { fontSize: 9, color: colors.inkSoft, marginTop: 2, fontFamily: fonts.sans },
});
