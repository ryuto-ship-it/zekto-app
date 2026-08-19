import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii, categoryLabels, categoryAccents } from '../theme/theme';
import { MERCHANTS, merchantBestCoinPct, merchantDist } from '../data/merchants';
import { Category } from '../data/products';
import Chip from '../components/Chip';
import SeoulMapView from '../components/SeoulMapView';
import { CategoryIcon, DiscoverIcon } from '../components/Icons';
import { RootStackParamList } from '../navigation/types';

const LIVE_BASE = 128;

type Filter = 'all' | Category;

const CHIPS: { key: Filter; label: string; cat?: Category }[] = [
  { key: 'all', label: 'All' },
  { key: 'beauty', label: 'Beauty & Medical', cat: 'beauty' },
  { key: 'hotel', label: 'Hotels', cat: 'hotel' },
  { key: 'dining', label: 'Dining', cat: 'dining' },
];

export default function MapScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [filter, setFilter] = useState<Filter>('all');
  const [liveCount, setLiveCount] = useState(LIVE_BASE);

  useEffect(() => {
    const timer = setInterval(() => {
      const jitter = Math.floor(Math.random() * 9) - 4;
      setLiveCount(Math.max(90, LIVE_BASE + jitter));
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const merchants = filter === 'all' ? MERCHANTS : MERCHANTS.filter((m) => m.cat === filter);

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
        {CHIPS.map((c) => {
          const active = filter === c.key;
          const activeColor = c.cat ? categoryAccents[c.cat] : colors.jade;
          const icon = c.cat ? (
            <CategoryIcon cat={c.cat} size={20} color={active ? colors.white : activeColor} strokeWidth={2} />
          ) : (
            <DiscoverIcon size={20} color={active ? colors.white : colors.jade} strokeWidth={2} />
          );
          return (
            <Chip key={c.key} label={c.label} icon={icon} active={active} activeColor={activeColor} onPress={() => setFilter(c.key)} />
          );
        })}
      </ScrollView>

      <View style={styles.mapArea}>
        <SeoulMapView merchants={merchants} onPressMerchant={openMerchant} />
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
            <View style={[styles.rowThumb, { backgroundColor: categoryAccents[m.cat] }]} />
            <View style={{ flex: 1 }}>
              <View style={styles.rowTitleRow}>
                <Text style={styles.rowTitle}>{m.name}</Text>
                <View style={styles.zeroPayBadge}>
                  <Text style={styles.zeroPayBadgeText}>✓ ZeroPay</Text>
                </View>
              </View>
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
    backgroundColor: '#E7EEE2',
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 6,
  },
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
  rowTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  rowTitle: { fontSize: 12.5, fontFamily: fonts.sansBold, color: colors.ink },
  zeroPayBadge: { backgroundColor: colors.jadeTint, borderRadius: 5, paddingVertical: 1.5, paddingHorizontal: 5 },
  zeroPayBadgeText: { fontSize: 8.5, fontFamily: fonts.sansBold, color: colors.jadeDeep },
  rowMeta: { fontSize: 10.5, color: colors.inkSoft, marginTop: 1, fontFamily: fonts.sans },
  rowDist: { fontFamily: fonts.monoSemiBold, fontSize: 11, color: colors.jadeDeep },
});
