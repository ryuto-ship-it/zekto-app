import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, Easing, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii } from '../../theme/theme';
import Sheet from '../../components/Sheet';
import { PrimaryButton } from '../../components/Buttons';
import { zektoSource } from '../../types/purchase';
import { useApp } from '../../context/AppContext';
import { RootStackParamList } from '../../navigation/types';
import type { PaymentSourceType } from '../../types/purchase';

const FAKE_ADDRESS = '0x71C7…9E3f';

type Mode = 'choose' | 'connecting' | 'connected';

export default function WalletConnectSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'WalletConnect'>>();
  const { balance } = useApp();
  const [mode, setMode] = useState<Mode>('choose');
  const [walletName, setWalletName] = useState<Exclude<PaymentSourceType, 'zekto'>>('MetaMask');
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (mode !== 'connecting') return;
    spin.setValue(0);
    const loop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 800, easing: Easing.linear, useNativeDriver: true })
    );
    loop.start();
    const timer = setTimeout(() => setMode('connected'), 1300);
    return () => {
      loop.stop();
      clearTimeout(timer);
    };
  }, [mode, spin]);

  const chooseZekto = () => {
    route.params.onSelectSource(zektoSource(balance, route.params.currentCoin));
    navigation.goBack();
  };

  const chooseWallet = (name: Exclude<PaymentSourceType, 'zekto'>) => {
    setWalletName(name);
    setMode('connecting');
  };

  const continueToPayment = () => {
    route.params.onSelectSource({
      type: walletName,
      label: `${walletName} Wallet`,
      sub: `${FAKE_ADDRESS} · network fee applies`,
    });
    navigation.goBack();
  };

  const spinDeg = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Sheet onClose={() => navigation.goBack()} scroll={mode === 'choose'}>
      {mode === 'choose' && (
        <View style={styles.chooseWrap}>
          <Text style={styles.h2}>Choose payment source</Text>
          <Text style={styles.subhead}>Pay from your FuturePass balance, or connect your own wallet.</Text>

          {!route.params.hideZekto ? (
            <Pressable style={styles.option} onPress={chooseZekto}>
              <View style={[styles.icon, styles.iconZekto]}>
                <Text style={styles.iconZektoText}>F</Text>
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>FuturePass Balance</Text>
                <Text style={styles.optionSub}>{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} {route.params.currentCoin} · instant, no network fee</Text>
              </View>
            </Pressable>
          ) : null}

          <Pressable style={styles.option} onPress={() => chooseWallet('MetaMask')}>
            <View style={[styles.icon, styles.iconMM]}>
              <Text style={styles.iconEmoji}>🦊</Text>
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>MetaMask</Text>
              <Text style={styles.optionSub}>Connect via browser extension or mobile</Text>
            </View>
          </Pressable>

          <Pressable style={styles.option} onPress={() => chooseWallet('Trust Wallet')}>
            <View style={[styles.icon, styles.iconTW]}>
              <Text style={styles.iconEmoji}>🛡️</Text>
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Trust Wallet</Text>
              <Text style={styles.optionSub}>Scan to connect with WalletConnect</Text>
            </View>
          </Pressable>
        </View>
      )}

      {mode === 'connecting' && (
        <View style={styles.centerWrap}>
          <Animated.View style={[styles.spinner, { transform: [{ rotate: spinDeg }] }]} />
          <Text style={styles.connectingTitle}>Opening {walletName}…</Text>
          <Text style={styles.connectingSub}>Approve the connection request in your wallet.</Text>
        </View>
      )}

      {mode === 'connected' && (
        <View style={styles.centerWrap}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.connectedTitle}>{walletName} connected</Text>
          <View style={styles.addrChip}>
            <Text style={styles.addrText}>{FAKE_ADDRESS}</Text>
          </View>
          <PrimaryButton label="Continue to payment" onPress={continueToPayment} style={styles.continueBtn} />
        </View>
      )}
    </Sheet>
  );
}

const styles = StyleSheet.create({
  chooseWrap: { paddingHorizontal: 0 },
  h2: { fontFamily: fonts.serifMedium, fontSize: 18, color: colors.ink, marginHorizontal: 20, marginTop: 6 },
  subhead: { fontSize: 12.5, color: colors.inkSoft, marginHorizontal: 20, marginTop: 4, marginBottom: 16, fontFamily: fonts.sans },
  option: {
    flexDirection: 'row', alignItems: 'center', gap: 14, marginHorizontal: 20, marginBottom: 12,
    backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.line, borderRadius: radii.lg, padding: 14,
  },
  icon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  iconZekto: { backgroundColor: colors.primaryTint },
  iconZektoText: { color: colors.primary, fontWeight: '700', fontSize: 16 },
  iconMM: { backgroundColor: '#FDF1E4' },
  iconTW: { backgroundColor: '#E7F0FB' },
  iconEmoji: { fontSize: 20 },
  optionText: { flex: 1 },
  optionTitle: { fontSize: 13.5, fontFamily: fonts.sansBold, color: colors.ink },
  optionSub: { fontSize: 11, color: colors.inkSoft, marginTop: 1, fontFamily: fonts.sans },
  centerWrap: { alignItems: 'center', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 10 },
  spinner: {
    width: 52, height: 52, borderRadius: 26, borderWidth: 4, borderColor: colors.primaryTint,
    borderTopColor: colors.primary, marginBottom: 18,
  },
  connectingTitle: { fontSize: 13.5, color: colors.ink, fontFamily: fonts.sansBold },
  connectingSub: { fontSize: 11.5, color: colors.inkSoft, marginTop: 4, textAlign: 'center', fontFamily: fonts.sans },
  checkCircle: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: colors.primaryTint,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  checkMark: { fontSize: 26, color: colors.primary },
  connectedTitle: { fontFamily: fonts.serifMedium, fontSize: 17, color: colors.ink },
  addrChip: { backgroundColor: colors.paper, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10, marginTop: 8, marginBottom: 20 },
  addrText: { fontFamily: fonts.monoMedium, fontSize: 13, color: colors.ink },
  continueBtn: { flex: 0, alignSelf: 'stretch', marginBottom: 4 },
});
