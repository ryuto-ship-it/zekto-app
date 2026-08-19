import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable, Animated, StyleSheet, LayoutChangeEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii, categoryLabels } from '../theme/theme';
import { MERCHANTS, Merchant, merchantBestCoinPct, merchantDist } from '../data/merchants';
import { Category } from '../data/products';
import Chip from '../components/Chip';
import { RootStackParamList } from '../navigation/types';

const GRID_GAP = 28;
const LIVE_BASE = 128;

type Filter = 'all' | Category;

const CHIPS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'beauty', label: '💉 Beauty & Medical' },
  { key: 'hotel', label: '🛏 Hotels' },
  { key: 'dining', label: '🍽 Dining' },
];

const PIN_COLOR: Record<Category, string> = {
  beauty: colors.coral,
  hotel: colors.jade,
  dining: colors.gold,
};

export default function MapScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [filter, setFilter] = useState<Filter>('all');
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [liveCount, setLiveCount] = useState(LIVE_BASE);

  useEffect(() => {
    const timer = setInterval(() => {
      const jitter = Math.floor(Math.random() * 9) - 4;
      setLiveCount(Math.max(90, LIVE_BASE + jitter));
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  const vLines = size.width ? Math.ceil(size.width / GRID_GAP) : 0;
  const hLines = size.height ? Math.ceil(size.height / GRID_GAP) : 0;

  const merchants = useMemo(() => (filter === 'all' ? MERCHANTS : MERCHANTS.filter((m) => m.cat === filter)), [filter]);

  const openMerchant = (merchantId: string) => navigation.navigate('Merchant', { merchantId });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.head}>
        <Text style={styles.h1}>Nearby Benefits</Text>
        <Text style={styles.sub}>Tap a pin to see what's on sale there right now.</Text>
      </View>

      <View style={styles.liveTicker}>
        <PulsingDot />
        <Text style={styles.liveText}>{liveCount} travelers browsing benefits near you</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow} contentContainerStyle={styles.chipRowContent}>
        {CHIPS.map((c) => (
          <Chip key={c.key} label={c.label} active={filter === c.key} onPress={() => setFilter(c.key)} />
        ))}
      </ScrollView>

      <View style={styles.mapArea} onLayout={onLayout}>
        {Array.from({ length: vLines }).map((_, i) => (
          <View key={`v${i}`} style={[styles.gridLineV, { left: i * GRID_GAP }]} />
        ))}
        {Array.from({ length: hLines }).map((_, i) => (
          <View key={`h${i}`} style={[styles.gridLineH, { top: i * GRID_GAP }]} />
        ))}

        <View style={[styles.pin, { left: '50%', top: '58%' }]}>
          <View style={[styles.pinDot, styles.pinDotYou]}>
            <Text style={styles.pinDotText}>YOU</Text>
          </View>
        </View>

        {merchants.map((m) => (
          <MapPin key={m.id} merchant={m} onPress={() => openMerchant(m.id)} />
        ))}

        <View style={styles.mapHint}>
          <Text style={styles.mapHintText}>📍 Myeongdong, Seoul</Text>
        </View>
      </View>

      <View style={styles.listHeadRow}>
        <Text style={styles.listHead}>Along your route</Text>
        <Text style={styles.listCount}>{merchants.length} places</Text>
      </View>
      <View style={styles.list}>
        {merchants.map((m) => (
          <Pressable key={m.id} style={styles.row} onPress={() => openMerchant(m.id)}>
            <View style={[styles.rowThumb, { backgroundColor: PIN_COLOR[m.cat] }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{m.name}</Text>
              <Text style={styles.rowMeta}>
                {categoryLabels[m.cat]} · up to -{merchantBestCoinPct(m.id)}% with stablecoin
              </Text>
            </View>
            <Text style={styles.rowDist}>{merchantDist(m.id)}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function PulsingDot() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return <Animated.View style={[styles.liveDot, { opacity }]} />;
}

function MapPin({ merchant, onPress }: { merchant: Merchant; onPress: () => void }) {
  const scale = useRef(new Animated.Value(0.4)).current;
  const ringOpacity = useRef(new Animated.Value(0.55)).current;
  const color = PIN_COLOR[merchant.cat];

  useEffect(() => {
    const loop = Animated.loop(
      Animated.parallel([
        Animated.timing(scale, { toValue: 1.9, duration: 2200, useNativeDriver: true }),
        Animated.timing(ringOpacity, { toValue: 0, duration: 2200, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => {
      loop.stop();
      scale.setValue(0.4);
      ringOpacity.setValue(0.55);
    };
  }, [scale, ringOpacity]);

  return (
    <Pressable style={[styles.pin, { left: merchant.pos.left, top: merchant.pos.top }]} onPress={onPress}>
      <Animated.View style={[styles.pulseRing, { backgroundColor: color, opacity: ringOpacity, transform: [{ scale }] }]} />
      <View style={[styles.pinDot, { backgroundColor: color }]}>
        <Text style={styles.pinDotText}>-{merchantBestCoinPct(merchant.id)}%</Text>
      </View>
      <View style={styles.pinLabel}>
        <Text style={styles.pinLabelText}>{merchant.name.split(' ')[0]}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: 32 },
  head: { marginHorizontal: 20, marginTop: 16, marginBottom: 4 },
  h1: { fontFamily: fonts.serif, fontSize: 21, color: colors.ink },
  sub: { fontSize: 12.5, color: colors.inkSoft, marginTop: 3, fontFamily: fonts.sans },
  liveTicker: { flexDirection: 'row', alignItems: 'center', gap: 7, marginHorizontal: 20, marginTop: 12 },
  liveDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#E2453F' },
  liveText: { fontSize: 11, color: colors.inkSoft, fontFamily: fonts.sans },
  chipRow: { marginTop: 12 },
  chipRowContent: { paddingHorizontal: 20, gap: 8 },
  mapArea: {
    marginHorizontal: 20,
    marginTop: 12,
    height: 300,
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: '#DCE6DA',
    borderWidth: 1,
    borderColor: colors.line,
  },
  gridLineV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(47,107,90,0.10)' },
  gridLineH: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: 'rgba(47,107,90,0.10)' },
  pin: { position: 'absolute', alignItems: 'center', transform: [{ translateX: -20 }, { translateY: -40 }] },
  pulseRing: { position: 'absolute', bottom: 0, alignSelf: 'center', width: 30, height: 30, borderRadius: 15 },
  pinDot: {
    width: 32, height: 32, borderRadius: 16, borderBottomRightRadius: 0,
    backgroundColor: colors.jade, transform: [{ rotate: '45deg' }], alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)',
  },
  pinDotYou: { backgroundColor: colors.ink },
  pinDotText: { color: colors.white, fontSize: 9, fontFamily: fonts.sansBold, transform: [{ rotate: '-45deg' }] },
  pinLabel: { marginTop: 4, backgroundColor: colors.white, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 6 },
  pinLabelText: { fontSize: 9.5, fontFamily: fonts.sansBold, color: colors.ink },
  mapHint: {
    position: 'absolute', left: 12, bottom: 12, backgroundColor: 'rgba(255,255,255,0.92)',
    paddingVertical: 6, paddingHorizontal: 10, borderRadius: 10,
  },
  mapHintText: { fontSize: 10, color: colors.inkSoft, fontFamily: fonts.sansMedium },
  listHeadRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20, marginBottom: 8 },
  listHead: { fontFamily: fonts.serif, fontSize: 16, color: colors.ink },
  listCount: { fontSize: 11, color: colors.jade, fontFamily: fonts.sansBold },
  list: { paddingHorizontal: 20, gap: 10 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white,
    borderWidth: 1, borderColor: colors.line, borderRadius: radii.lg, padding: 10,
  },
  rowThumb: { width: 44, height: 44, borderRadius: 10 },
  rowTitle: { fontSize: 12.5, fontFamily: fonts.sansBold, color: colors.ink },
  rowMeta: { fontSize: 10.5, color: colors.inkSoft, marginTop: 1, fontFamily: fonts.sans },
  rowDist: { fontFamily: fonts.monoSemiBold, fontSize: 11, color: colors.jadeDeep },
});
