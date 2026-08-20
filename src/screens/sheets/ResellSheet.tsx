import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii } from '../../theme/theme';
import { won } from '../../utils/format';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import Sheet from '../../components/Sheet';
import { PrimaryButton } from '../../components/Buttons';
import { RESALE_PRESET_PCTS } from '../../data/resale';
import { RootStackParamList } from '../../navigation/types';

export default function ResellSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Resell'>>();
  const { purchased, listForResale } = useApp();
  const showToast = useToast();
  const pass = purchased.find((p) => p.uid === route.params.passUid);
  const [pct, setPct] = useState(0.8);

  if (!pass) return null;

  const resalePrice = Math.round((pass.price * pct) / 1000) * 1000;

  const confirm = () => {
    listForResale(pass.uid, resalePrice);
    showToast('✓ Listed for resale');
    navigation.goBack();
  };

  return (
    <Sheet onClose={() => navigation.goBack()} scroll={false}>
      <View style={styles.header}>
        <Text style={styles.h2}>Resell this pass</Text>
        <Text style={styles.subhead}>{pass.title}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>You paid</Text>
        <Text style={styles.priceValue}>{won(pass.price)}</Text>
      </View>

      <Text style={styles.cap}>Set your resale price (50%–100% of what you paid)</Text>
      <View style={styles.presetRow}>
        {RESALE_PRESET_PCTS.map((p) => {
          const active = p === pct;
          return (
            <Pressable key={p} style={[styles.preset, active && styles.presetActive]} onPress={() => setPct(p)}>
              <Text style={[styles.presetPct, active && styles.presetPctActive]}>{Math.round(p * 100)}%</Text>
              <Text style={styles.presetPrice}>{won(pass.price * p)}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Listing price</Text>
        <Text style={styles.summaryValue}>{won(resalePrice)}</Text>
      </View>
      <Text style={styles.note}>Resale is capped at your original price to prevent scalping — no markups allowed.</Text>

      <View style={styles.footer}>
        <PrimaryButton label="List for Resale" onPress={confirm} />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 6 },
  h2: { fontFamily: fonts.serifMedium, fontSize: 18, color: colors.ink },
  subhead: { fontSize: 12.5, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans },
  priceRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: 20, marginTop: 16, backgroundColor: colors.white, borderWidth: 1,
    borderColor: colors.line, borderRadius: radii.md, padding: 14,
  },
  priceLabel: { fontSize: 12.5, color: colors.inkSoft, fontFamily: fonts.sans },
  priceValue: { fontFamily: fonts.monoSemiBold, fontSize: 15, color: colors.ink },
  cap: {
    marginHorizontal: 20, marginTop: 18, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5,
    color: colors.inkSoft, fontFamily: fonts.sansBold,
  },
  presetRow: { flexDirection: 'row', gap: 8, marginHorizontal: 20, marginTop: 10 },
  preset: { flex: 1, borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.white, borderRadius: 14, paddingVertical: 10, alignItems: 'center' },
  presetActive: { borderColor: colors.gold, backgroundColor: colors.goldTint },
  presetPct: { fontFamily: fonts.monoSemiBold, fontSize: 13, color: colors.ink },
  presetPctActive: { color: '#7A6023' },
  presetPrice: { fontSize: 9.5, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans },
  summary: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20,
    marginTop: 18, backgroundColor: colors.primaryTint, borderRadius: radii.md, padding: 14,
  },
  summaryLabel: { fontSize: 13, color: colors.primary, fontFamily: fonts.sansBold },
  summaryValue: { fontFamily: fonts.monoSemiBold, fontSize: 18, color: colors.primary },
  note: { fontSize: 10.5, color: colors.inkSoft, marginHorizontal: 20, marginTop: 8, fontFamily: fonts.sans },
  footer: { paddingHorizontal: 20, marginTop: 18, marginBottom: 6 },
});
