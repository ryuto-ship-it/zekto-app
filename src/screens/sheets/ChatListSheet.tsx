import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii, shadows } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import Sheet from '../../components/Sheet';
import { RootStackParamList } from '../../navigation/types';

export default function ChatListSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ChatList'>>();
  const { resaleListings } = useApp();
  const listing = resaleListings.find((l) => l.id === route.params.listingId);

  if (!listing) return null;

  return (
    <Sheet onClose={() => navigation.goBack()}>
      <View style={styles.header}>
        <Text style={styles.h2}>Buyer inquiries</Text>
        <Text style={styles.subhead} numberOfLines={1}>{listing.title}</Text>
      </View>

      {listing.chats.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No inquiries yet</Text>
          <Text style={styles.emptyText}>Interested buyers will message you here.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {listing.chats.map((c) => {
            const last = c.messages[c.messages.length - 1];
            return (
              <Pressable
                key={c.id}
                style={styles.row}
                onPress={() => navigation.navigate('ChatRoom', { listingId: listing.id, threadId: c.id })}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{c.buyerName.slice(-2)}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.name}>{c.buyerName}</Text>
                  <Text style={styles.preview} numberOfLines={1}>{last?.text ?? ''}</Text>
                </View>
                {c.unread > 0 ? (
                  <View style={styles.unreadDot}>
                    <Text style={styles.unreadDotText}>{c.unread}</Text>
                  </View>
                ) : null}
              </Pressable>
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
  list: { paddingHorizontal: 20, gap: 10 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white,
    borderRadius: radii.xl, padding: 12, ...shadows.card,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.sansBold, fontSize: 12, color: colors.primary },
  info: { flex: 1, minWidth: 0 },
  name: { fontSize: 13, fontFamily: fonts.sansExtraBold, color: colors.ink },
  preview: { fontSize: 11.5, color: colors.inkSoft, marginTop: 2, fontFamily: fonts.sans },
  unreadDot: { minWidth: 20, height: 20, borderRadius: 10, backgroundColor: colors.coral, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  unreadDotText: { color: colors.white, fontSize: 10.5, fontFamily: fonts.sansBold },
});
