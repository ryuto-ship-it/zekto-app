import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import Sheet from '../../components/Sheet';
import { RootStackParamList } from '../../navigation/types';

export default function ChatRoomSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ChatRoom'>>();
  const { resaleListings, sendChatMessage, markThreadRead } = useApp();
  const { listingId, threadId } = route.params;
  const listing = resaleListings.find((l) => l.id === listingId);
  const thread = listing?.chats.find((c) => c.id === threadId);
  const [text, setText] = useState('');

  useEffect(() => {
    if (thread && thread.unread > 0) markThreadRead(listingId, threadId);
  }, [listingId, threadId, thread?.unread, markThreadRead]);

  if (!listing || !thread) return null;

  const send = () => {
    if (!text.trim()) return;
    sendChatMessage(listingId, threadId, text);
    setText('');
  };

  return (
    <Sheet
      onClose={() => navigation.goBack()}
      footer={
        <>
          <TextInput
            style={styles.input}
            placeholder="Type a message…"
            placeholderTextColor={colors.inkSoft}
            value={text}
            onChangeText={setText}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <Pressable style={styles.sendBtn} onPress={send} hitSlop={6}>
            <Text style={styles.sendBtnText}>Send</Text>
          </Pressable>
        </>
      }
    >
      <View style={styles.header}>
        <Text style={styles.h2}>{thread.buyerName}</Text>
        <Text style={styles.subhead} numberOfLines={1}>{listing.title}</Text>
      </View>
      <View style={styles.messages}>
        {thread.messages.map((m) => (
          <View key={m.id} style={[styles.bubbleRow, m.sender === 'me' && styles.bubbleRowMe]}>
            <View style={[styles.bubble, m.sender === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
              <Text style={[styles.bubbleText, m.sender === 'me' && styles.bubbleTextMe]}>{m.text}</Text>
            </View>
            <Text style={[styles.time, m.sender === 'me' && styles.timeMe]}>{m.time}</Text>
          </View>
        ))}
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 12 },
  h2: { fontFamily: fonts.serifMedium, fontSize: 18, color: colors.ink },
  subhead: { fontSize: 12.5, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans },
  messages: { paddingHorizontal: 20, gap: 10, minHeight: 160 },
  bubbleRow: { alignItems: 'flex-start' },
  bubbleRowMe: { alignItems: 'flex-end' },
  bubble: { maxWidth: '78%', borderRadius: 16, paddingVertical: 9, paddingHorizontal: 13 },
  bubbleThem: { backgroundColor: colors.paper, borderBottomLeftRadius: 4 },
  bubbleMe: { backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  bubbleText: { fontSize: 13, color: colors.ink, fontFamily: fonts.sans, lineHeight: 18 },
  bubbleTextMe: { color: colors.white },
  time: { fontSize: 9.5, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans },
  timeMe: { alignSelf: 'flex-end' },
  input: {
    flex: 1, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line,
    borderRadius: radii.pill, paddingVertical: 10, paddingHorizontal: 15, fontSize: 13,
    color: colors.ink, fontFamily: fonts.sans,
  },
  sendBtn: { backgroundColor: colors.primary, borderRadius: radii.pill, paddingVertical: 11, paddingHorizontal: 18 },
  sendBtnText: { color: colors.white, fontSize: 13, fontFamily: fonts.sansBold },
});
