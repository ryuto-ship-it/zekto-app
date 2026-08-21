import React, { useRef, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radii, shadows } from '../theme/theme';
import { HomeIcon, PieChartIcon, XIcon, TelegramIcon, CloseIcon } from './Icons';
import { LANDING_URL } from '../config/links';
import { TOKENOMICS_ALLOCATION } from '../config/tokenomics';
import TokenomicsChart from './TokenomicsChart';

const FLYOUT_WIDTH = 260;

function RailButton({
  onPress,
  label,
  children,
}: {
  onPress: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const animateTo = (v: number) =>
    Animated.spring(scale, { toValue: v, useNativeDriver: true, speed: 30, bounciness: 6 }).start();

  return (
    <Pressable onPress={onPress} onPressIn={() => animateTo(0.92)} onPressOut={() => animateTo(1)} style={styles.railBtnHit}>
      <Animated.View style={{ transform: [{ scale }], alignItems: 'center' }}>
        <LinearGradient colors={[colors.primary, colors.coral]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.railBtn}>
          {children}
        </LinearGradient>
        <Text style={styles.railLabel}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function SidePanel({ side }: { side: 'left' | 'right' }) {
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [comingSoon, setComingSoon] = useState<string | null>(null);
  const flyoutAnim = useRef(new Animated.Value(0)).current;
  const comingSoonTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleFlyout = () => {
    const next = !flyoutOpen;
    setFlyoutOpen(next);
    Animated.spring(flyoutAnim, { toValue: next ? 1 : 0, useNativeDriver: true, speed: 16, bounciness: 6 }).start();
  };

  const showComingSoon = (label: string) => {
    if (comingSoonTimer.current) clearTimeout(comingSoonTimer.current);
    setComingSoon(label);
    comingSoonTimer.current = setTimeout(() => setComingSoon(null), 2000);
  };

  const openLanding = () => {
    if (typeof window !== 'undefined') {
      window.open(LANDING_URL, '_blank', 'noopener,noreferrer');
    }
  };

  // The flyout always opens toward the phone frame (inward) — the rail sits
  // flush against the outer viewport edge, so there's no room to open
  // outward past it. It enters from a little further out than its resting
  // spot, i.e. sliding in from the rail's direction.
  const entryOffset = side === 'left' ? -24 : 24;
  const flyoutTranslate = flyoutAnim.interpolate({ inputRange: [0, 1], outputRange: [entryOffset, 0] });

  return (
    <View style={[styles.wrap, side === 'left' ? styles.wrapLeft : styles.wrapRight]}>
      <View style={styles.rail}>
        <Text style={styles.railWordmark}>Z</Text>
        <RailButton onPress={openLanding} label="Home">
          <HomeIcon size={17} />
        </RailButton>
        <RailButton onPress={toggleFlyout} label="Tokens">
          <PieChartIcon size={17} />
        </RailButton>
        <RailButton onPress={() => showComingSoon('X (Twitter) — coming soon')} label="X">
          <XIcon size={15} />
        </RailButton>
        <RailButton onPress={() => showComingSoon('Telegram — coming soon')} label="Telegram">
          <TelegramIcon size={16} />
        </RailButton>
      </View>

      {flyoutOpen && (
        <Animated.View
          style={[
            styles.flyout,
            side === 'left' ? { left: 96 } : { right: 96 },
            { opacity: flyoutAnim, transform: [{ translateX: flyoutTranslate }] },
          ]}
        >
          <TokenomicsFlyoutContent onClose={toggleFlyout} />
        </Animated.View>
      )}

      {comingSoon && (
        <View style={styles.comingSoonBubble}>
          <Text style={styles.comingSoonText}>{comingSoon}</Text>
        </View>
      )}
    </View>
  );
}

function TokenomicsFlyoutContent({ onClose }: { onClose: () => void }) {
  return (
    <View style={styles.flyoutCard}>
      <View style={styles.flyoutHeaderRow}>
        <Text style={styles.flyoutTitle}>$ZEKTO Allocation</Text>
        <Pressable onPress={onClose} style={styles.flyoutCloseBtn} hitSlop={8}>
          <CloseIcon size={11} />
        </Pressable>
      </View>
      <Text style={styles.flyoutSub}>Illustrative — subject to change before token launch</Text>
      <TokenomicsChart data={TOKENOMICS_ALLOCATION} size={172} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', width: 96 },
  wrapLeft: { left: 0 },
  wrapRight: { right: 0 },
  rail: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: radii.xxl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  railWordmark: {
    fontFamily: fonts.serifBold,
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 2,
  },
  railBtnHit: {
    alignItems: 'center',
  },
  railBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.floating,
  },
  railLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.75)',
    fontFamily: fonts.sansMedium,
    marginTop: 5,
    letterSpacing: 0.3,
  },
  flyout: {
    position: 'absolute',
    zIndex: 5,
    top: '50%',
    marginTop: -140,
  },
  flyoutCard: {
    width: FLYOUT_WIDTH,
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: 16,
    ...shadows.cardLarge,
  },
  flyoutHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  flyoutTitle: { fontFamily: fonts.serifMedium, fontSize: 15, color: colors.ink },
  flyoutCloseBtn: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: colors.paper,
    alignItems: 'center', justifyContent: 'center',
  },
  flyoutSub: { fontSize: 10, color: colors.inkSoft, marginTop: 3, marginBottom: 10, fontFamily: fonts.sans },
  comingSoonBubble: {
    position: 'absolute',
    bottom: 24,
    backgroundColor: colors.ink,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    maxWidth: 140,
  },
  comingSoonText: { color: colors.white, fontSize: 10.5, fontFamily: fonts.sansBold, textAlign: 'center' },
});
