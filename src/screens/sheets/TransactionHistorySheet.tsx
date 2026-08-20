import React from 'react';
import { View, Text, Pressable, Linking, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii, shadows } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import Sheet from '../../components/Sheet';
import { RootStackParamList } from '../../navigation/types';
import { TX_TYPE_LABEL, shortHash, konetExplorerUrl, TransactionType } from '../../data/transactions';

const TYPE_COLOR: Record<TransactionType, string> = {
  deposit: colors.teal,
  purchase: colors.primary,
  resale_sold: colors.gold,
  resale_bought: colors.coral,
};

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' · ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export default function TransactionHistorySheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { transactions } = useApp();

  return (
    <Sheet onClose={() => navigation.goBack()}>
      <View style={styles.header}>
        <Text style={styles.h2}>Transaction history</Text>
        <Text style={styles.subhead}>{transactions.length} transactions</Text>
      </View>

      <View style={styles.konetNote}>
        <Text style={styles.konetNoteText}>⛓ Powered by KONET · every transaction below is recorded on-chain</Text>
      </View>

      <View style={styles.list}>
        {transactions.map((tx) => (
          <View key={tx.id} style={styles.row}>
            <View style={[styles.typeDot, { backgroundColor: TYPE_COLOR[tx.type] }]} />
            <View style={styles.info}>
              <Text style={styles.label} numberOfLines={1}>{tx.label}</Text>
              <View style={styles.metaRow}>
                <Text style={[styles.typeText, { color: TYPE_COLOR[tx.type] }]}>{TX_TYPE_LABEL[tx.type]}</Text>
                <Text style={styles.dot}>·</Text>
                <Text style={styles.dateText}>{formatDate(tx.timestamp)}</Text>
              </View>
              <Pressable onPress={() => Linking.openURL(konetExplorerUrl(tx.hash))} hitSlop={4}>
                <Text style={styles.hashText}>{shortHash(tx.hash)} ↗</Text>
              </Pressable>
            </View>
            <View style={styles.right}>
              <Text style={[styles.amount, tx.type === 'deposit' && styles.amountPositive]}>
                {tx.type === 'deposit' ? '+' : '-'}{tx.amount.toLocaleString('en-US', { maximumFractionDigits: 2 })} {tx.coin}
              </Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Confirmed</Text>
              </View>
            </View>
          </View>
        ))}
        {transactions.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No transactions yet</Text>
            <Text style={styles.emptyText}>Purchases, deposits, and resales will show up here.</Text>
          </View>
        ) : null}
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 10 },
  h2: { fontFamily: fonts.serifMedium, fontSize: 18, color: colors.ink },
  subhead: { fontSize: 12.5, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans },
  konetNote: {
    marginHorizontal: 20, marginBottom: 14, backgroundColor: colors.primaryTint, borderRadius: radii.md,
    paddingVertical: 8, paddingHorizontal: 12,
  },
  konetNoteText: { fontSize: 10.5, color: colors.primary, fontFamily: fonts.sansBold },
  list: { paddingHorizontal: 20, gap: 10 },
  row: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: colors.white,
    borderRadius: radii.lg, padding: 12, ...shadows.card,
  },
  typeDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5 },
  info: { flex: 1, minWidth: 0 },
  label: { fontSize: 12.5, fontFamily: fonts.sansBold, color: colors.ink },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  typeText: { fontSize: 10, fontFamily: fonts.sansBold },
  dot: { fontSize: 10, color: colors.inkSoft },
  dateText: { fontSize: 10, color: colors.inkSoft, fontFamily: fonts.sans },
  hashText: { fontSize: 10.5, color: colors.primary, fontFamily: fonts.monoMedium, marginTop: 4 },
  right: { alignItems: 'flex-end' },
  amount: { fontFamily: fonts.monoSemiBold, fontSize: 12.5, color: colors.ink },
  amountPositive: { color: colors.teal },
  statusBadge: { backgroundColor: colors.paper, borderRadius: 6, paddingVertical: 2, paddingHorizontal: 6, marginTop: 5 },
  statusText: { fontSize: 8.5, color: colors.inkSoft, fontFamily: fonts.sansBold },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyTitle: { fontFamily: fonts.serif, fontSize: 15, color: colors.ink, marginBottom: 4 },
  emptyText: { fontSize: 12, color: colors.inkSoft },
});
