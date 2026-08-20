import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import Sheet from '../../components/Sheet';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { generateQrCells } from '../../utils/qr';
import { RootStackParamList } from '../../navigation/types';

export default function QRSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'QRCode'>>();
  const { purchased, markUsed } = useApp();
  const showToast = useToast();

  const pass = purchased.find((p) => p.uid === route.params.passUid);
  const cells = useMemo(() => generateQrCells(route.params.passUid), [route.params.passUid]);

  if (!pass) return null;

  const onMarkUsed = () => {
    markUsed(pass.uid);
    showToast(`✓ Pass redeemed at ${pass.merchant}`);
    navigation.goBack();
  };

  return (
    <Sheet onClose={() => navigation.goBack()} scroll={false} footer={
      <>
        <SecondaryButton label="Close" onPress={() => navigation.goBack()} style={{ flex: 1 }} />
        {!pass.used ? <PrimaryButton label="Mark as used" onPress={onMarkUsed} /> : null}
      </>
    }>
      <View style={styles.wrap}>
        <Text style={styles.title}>{pass.title}</Text>
        <Text style={styles.sub}>
          {pass.used ? 'This pass has already been redeemed.' : `Show this to ${pass.merchant} staff to redeem`}
        </Text>
        <View style={styles.qrBox}>
          <View style={styles.qrGrid}>
            {cells.map((on, i) => (
              <View key={i} style={[styles.qrCell, on ? styles.qrCellOn : styles.qrCellOff]} />
            ))}
          </View>
        </View>
        <Text style={styles.code}>{pass.code}</Text>
        <View style={styles.chainNotice}>
          <Text style={styles.chainNoticeText}>
            ⛓ This pass was issued directly by {pass.merchant} and recorded on-chain — it can't be forged or duplicated.
          </Text>
        </View>
      </View>
    </Sheet>
  );
}

const GRID_SIZE = 172;
const CELL_GAP = 3;
const CELL_SIZE = (GRID_SIZE - CELL_GAP * 8) / 9;

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingTop: 10, paddingHorizontal: 20 },
  title: { fontFamily: fonts.serifMedium, fontSize: 18, color: colors.ink, marginBottom: 4, textAlign: 'center' },
  sub: { fontSize: 12, color: colors.inkSoft, marginBottom: 16, textAlign: 'center', fontFamily: fonts.sans },
  qrBox: {
    width: 200, height: 200, backgroundColor: colors.white, borderRadius: radii.xl, borderWidth: 1,
    borderColor: colors.line, alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  qrGrid: { width: GRID_SIZE, height: GRID_SIZE, flexDirection: 'row', flexWrap: 'wrap', gap: CELL_GAP },
  qrCell: { width: CELL_SIZE, height: CELL_SIZE, borderRadius: 1 },
  qrCellOn: { backgroundColor: colors.ink },
  qrCellOff: { backgroundColor: 'transparent' },
  code: { fontFamily: fonts.monoSemiBold, fontSize: 13, letterSpacing: 1, color: colors.primary, marginBottom: 8 },
  chainNotice: {
    backgroundColor: colors.primaryTint, borderRadius: radii.md, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 4,
  },
  chainNoticeText: { fontSize: 10.5, color: colors.primary, textAlign: 'center', lineHeight: 15, fontFamily: fonts.sans },
});
