import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii } from '../../theme/theme';
import { useApp } from '../../context/AppContext';
import Sheet from '../../components/Sheet';
import { PrimaryButton } from '../../components/Buttons';
import { RootStackParamList } from '../../navigation/types';
import { COINS, CoinSymbol, PaymentSource } from '../../types/purchase';

const PRESET_AMOUNTS = [100, 500, 1000, 5000];
const DEPOSIT_ADDRESS = '0x8F2b…C41a';
const NETWORK_FEE = 0.5;

type Stage = 'form' | 'confirm' | 'processing' | 'done';

export default function AddFundsSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addFunds } = useApp();
  const [coin, setCoin] = useState<CoinSymbol>('USDT');
  const [amount, setAmount] = useState<number | null>(500);
  const [customAmount, setCustomAmount] = useState('');
  const [source, setSource] = useState<PaymentSource | null>(null);
  const [stage, setStage] = useState<Stage>('form');
  const fillAnim = useRef(new Animated.Value(0)).current;

  const selectPreset = (v: number) => {
    setAmount(v);
    setCustomAmount('');
  };

  const onCustomChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setCustomAmount(cleaned);
    setAmount(cleaned ? parseInt(cleaned, 10) : null);
  };

  const openWalletChoice = () => {
    navigation.navigate('WalletConnect', { currentCoin: coin, onSelectSource: setSource, hideZekto: true });
  };

  const canContinue = !!amount && amount > 0 && !!source;

  const confirmTransfer = () => {
    setStage('processing');
    fillAnim.setValue(0);
    Animated.timing(fillAnim, { toValue: 1, duration: 1400, useNativeDriver: false }).start(() => {
      if (amount && source) addFunds(amount, coin, source.label);
      setStage('done');
    });
  };

  const sourceIcon = source?.type === 'MetaMask' ? '🦊' : source?.type === 'Trust Wallet' ? '🛡️' : null;

  return (
    <Sheet onClose={() => navigation.goBack()} scroll={stage === 'form'}>
      {stage === 'form' ? (
        <>
          <View style={styles.header}>
            <Text style={styles.h2}>Add funds</Text>
            <Text style={styles.subhead}>Top up your FuturePass balance from an external wallet.</Text>
          </View>

          <Text style={styles.cap}>Choose a stablecoin</Text>
          <View style={styles.coinTabs}>
            {COINS.map((c) => {
              const active = c.symbol === coin;
              return (
                <Pressable key={c.symbol} style={[styles.coinTab, active && styles.coinTabActive]} onPress={() => setCoin(c.symbol)}>
                  <Text style={[styles.coinSym, active && styles.coinSymActive]}>{c.symbol}</Text>
                  <Text style={styles.coinNet}>{c.network}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.cap}>Amount</Text>
          <View style={styles.presetRow}>
            {PRESET_AMOUNTS.map((v) => {
              const active = amount === v && !customAmount;
              return (
                <Pressable key={v} style={[styles.preset, active && styles.presetActive]} onPress={() => selectPreset(v)}>
                  <Text style={[styles.presetText, active && styles.presetTextActive]}>{v}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.customRow}>
            <Text style={styles.customPrefix}>{coin}</Text>
            <TextInput
              style={styles.customInput}
              placeholder="Custom amount"
              placeholderTextColor={colors.inkSoft}
              keyboardType="numeric"
              value={customAmount}
              onChangeText={onCustomChange}
            />
          </View>

          <Text style={styles.cap}>Send from</Text>
          <Pressable style={styles.sourceRow} onPress={openWalletChoice}>
            <View style={styles.sourceLeft}>
              {sourceIcon ? (
                <View style={styles.sourceIconWrap}>
                  <Text style={styles.sourceIconText}>{sourceIcon}</Text>
                </View>
              ) : (
                <View style={styles.sourceIconWrap} />
              )}
              <View>
                <Text style={styles.sourceTitle}>{source ? source.label : 'Connect a wallet'}</Text>
                <Text style={styles.sourceSub}>{source ? source.sub : 'MetaMask or Trust Wallet'}</Text>
              </View>
            </View>
            <Text style={styles.chevron}>⌄</Text>
          </Pressable>

          <View style={styles.footer}>
            <PrimaryButton label="Continue" onPress={() => setStage('confirm')} disabled={!canContinue} />
          </View>
        </>
      ) : null}

      {stage === 'confirm' && amount && source ? (
        <>
          <View style={styles.header}>
            <Text style={styles.h2}>Confirm transfer</Text>
            <Text style={styles.subhead}>Review the details before sending.</Text>
          </View>
          <Row label="From" value={`${source.label} · ${source.sub.split(' · ')[0]}`} />
          <Row label="To" value={`FuturePass · ${DEPOSIT_ADDRESS}`} />
          <Row label="Amount" value={`${amount.toLocaleString('en-US')} ${coin}`} />
          <Row label="Network fee" value={`~${NETWORK_FEE} ${coin}`} />
          <Row label="Estimated arrival" value="~1 minute" last />
          <View style={styles.footer}>
            <PrimaryButton label="Confirm transfer" onPress={confirmTransfer} />
          </View>
        </>
      ) : null}

      {stage === 'processing' ? (
        <View style={styles.centerWrap}>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                { width: fillAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
              ]}
            />
          </View>
          <Text style={styles.connectingTitle}>Sending transfer…</Text>
          <Text style={styles.connectingSub}>Waiting for network confirmation.</Text>
        </View>
      ) : null}

      {stage === 'done' && amount ? (
        <View style={styles.centerWrap}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.connectedTitle}>Funds added</Text>
          <Text style={styles.connectedSub}>{amount.toLocaleString('en-US')} {coin} was added to your FuturePass balance.</Text>
          <PrimaryButton label="Done" onPress={() => navigation.goBack()} style={styles.doneBtn} />
        </View>
      ) : null}
    </Sheet>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 6 },
  h2: { fontFamily: fonts.serifMedium, fontSize: 18, color: colors.ink },
  subhead: { fontSize: 12.5, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans },
  cap: {
    marginHorizontal: 20, marginTop: 18, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5,
    color: colors.inkSoft, fontFamily: fonts.sansBold,
  },
  coinTabs: { flexDirection: 'row', gap: 8, marginHorizontal: 20, marginTop: 10 },
  coinTab: { flex: 1, borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.white, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 6, alignItems: 'center' },
  coinTabActive: { borderColor: colors.primary, backgroundColor: colors.primaryTint },
  coinSym: { fontFamily: fonts.monoSemiBold, fontSize: 13, color: colors.ink },
  coinSymActive: { color: colors.primary },
  coinNet: { fontSize: 9, color: colors.inkSoft, marginTop: 2, fontFamily: fonts.sans },
  presetRow: { flexDirection: 'row', gap: 8, marginHorizontal: 20, marginTop: 10 },
  preset: { flex: 1, borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.white, borderRadius: 14, paddingVertical: 10, alignItems: 'center' },
  presetActive: { borderColor: colors.gold, backgroundColor: colors.goldTint },
  presetText: { fontFamily: fonts.monoSemiBold, fontSize: 13, color: colors.ink },
  presetTextActive: { color: '#7A6023' },
  customRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginTop: 10,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: radii.md, paddingHorizontal: 14, paddingVertical: 4,
  },
  customPrefix: { fontFamily: fonts.monoSemiBold, fontSize: 12.5, color: colors.inkSoft },
  customInput: { flex: 1, paddingVertical: 10, fontSize: 13, color: colors.ink, fontFamily: fonts.sans },
  sourceRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 10,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 14, padding: 13,
  },
  sourceLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  sourceIconWrap: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  sourceIconText: { fontSize: 15 },
  sourceTitle: { fontSize: 12.5, color: colors.ink, fontFamily: fonts.sansBold },
  sourceSub: { fontSize: 10.5, color: colors.inkSoft, marginTop: 1, fontFamily: fonts.sans },
  chevron: { color: colors.inkSoft, fontSize: 16 },
  footer: { paddingHorizontal: 20, marginTop: 20, marginBottom: 6 },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.line,
  },
  rowLast: {},
  rowLabel: { fontSize: 13, color: colors.inkSoft, fontFamily: fonts.sans },
  rowValue: { fontSize: 13, fontFamily: fonts.sansBold, color: colors.ink, flexShrink: 1, textAlign: 'right', marginLeft: 12 },
  centerWrap: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 40, paddingBottom: 16 },
  progressTrack: { width: '100%', height: 6, borderRadius: 3, backgroundColor: colors.primaryTint, overflow: 'hidden', marginBottom: 18 },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  connectingTitle: { fontSize: 13.5, color: colors.ink, fontFamily: fonts.sansBold },
  connectingSub: { fontSize: 11.5, color: colors.inkSoft, marginTop: 4, textAlign: 'center', fontFamily: fonts.sans },
  checkCircle: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: colors.primaryTint,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  checkMark: { fontSize: 26, color: colors.primary },
  connectedTitle: { fontFamily: fonts.serifMedium, fontSize: 17, color: colors.ink },
  connectedSub: { fontSize: 12, color: colors.inkSoft, marginTop: 6, marginBottom: 20, textAlign: 'center', fontFamily: fonts.sans },
  doneBtn: { flex: 0, alignSelf: 'stretch', marginBottom: 4 },
});
