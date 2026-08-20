import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii, categoryLabels, categoryAccents, categoryAccentTints, categoryColors } from '../theme/theme';
import { PRODUCTS, Category } from '../data/products';
import Chip from '../components/Chip';
import { PickCard, DealCard } from '../components/ProductCard';
import { ResaleCard } from '../components/ResaleCard';
import { SearchIcon, CategoryIcon, DiscoverIcon } from '../components/Icons';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';
import HScroll from '../components/HScroll';
import HeroCarousel from '../components/HeroCarousel';
import PulsingDot from '../components/PulsingDot';
import FadeInUp from '../components/FadeInUp';

const LIVE_BOOKINGS_BASE = 342;

type Filter = 'all' | Category | 'resale';

const CHIPS: { key: Filter; label: string; cat?: Category }[] = [
  { key: 'all', label: 'All' },
  { key: 'beauty', label: 'Beauty & Medical', cat: 'beauty' },
  { key: 'hotel', label: 'Hotels', cat: 'hotel' },
  { key: 'dining', label: 'Dining', cat: 'dining' },
  { key: 'shopping', label: 'Fashion & Shopping', cat: 'shopping' },
  { key: 'show', label: 'Shows & Entertainment', cat: 'show' },
  { key: 'resale', label: 'Resale' },
];

export default function DiscoverScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { resaleListings, toggleLike, bumpListingViews } = useApp();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [liveBookings, setLiveBookings] = useState(LIVE_BOOKINGS_BASE);

  useEffect(() => {
    if (filter === 'resale') bumpListingViews();
    // Only re-fire when the Resale tab is (re-)selected, not on every listing update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveBookings((prev) => Math.max(300, prev + Math.floor(Math.random() * 5) - 1));
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const picks = useMemo(() => PRODUCTS.filter((p) => p.pick), []);
  const list = useMemo(() => {
    let items = filter === 'all' || filter === 'resale' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter(
        (p) => p.title.toLowerCase().includes(q) || p.merchant.toLowerCase().includes(q) || p.loc.toLowerCase().includes(q)
      );
    }
    return items;
  }, [filter, query]);

  const openDetail = (id: number) => navigation.navigate('ProductDetail', { productId: id });
  const openResale = (productId: number, resaleId: string) => navigation.navigate('ProductDetail', { productId, resaleId });

  const screenBg = filter !== 'all' && filter !== 'resale' ? categoryAccentTints[filter] : colors.paper;

  return (
    <ScrollView style={[styles.screen, { backgroundColor: screenBg }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <HeroCarousel />

      <View style={styles.liveTicker}>
        <PulsingDot />
        <Text style={styles.liveText}>Live · {liveBookings} bookings today</Text>
      </View>

      <View style={styles.searchWrap}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clinics, hotels, restaurants…"
            placeholderTextColor={colors.inkSoft}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      <HScroll style={styles.chipRow} contentContainerStyle={styles.chipRowContent}>
        {CHIPS.map((c) => {
          const active = filter === c.key;
          const activeColor = c.cat ? categoryAccents[c.cat] : c.key === 'resale' ? colors.gold : colors.primary;
          const icon = c.cat ? (
            <CategoryIcon cat={c.cat} size={20} color={active ? colors.white : activeColor} strokeWidth={2} />
          ) : c.key === 'all' ? (
            <DiscoverIcon size={20} color={active ? colors.white : colors.primary} strokeWidth={2} />
          ) : null;
          return (
            <Chip
              key={c.key}
              label={c.key === 'resale' ? '🔁 ' + c.label : c.label}
              icon={icon}
              active={active}
              activeColor={activeColor}
              activeGradient={c.cat ? categoryColors[c.cat] : undefined}
              onPress={() => setFilter(c.key)}
            />
          );
        })}
      </HScroll>

      {filter === 'resale' ? (
        <>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Other travelers are selling</Text>
            <Text style={styles.sectionSub}>{resaleListings.length} listed</Text>
          </View>
          <View style={styles.dealList}>
            {resaleListings.map((l, i) => (
              <FadeInUp key={l.id} index={i}>
                <ResaleCard
                  listing={l}
                  onPress={() => openResale(l.productId, l.id)}
                  onToggleLike={() => toggleLike(l.id)}
                />
              </FadeInUp>
            ))}
            {resaleListings.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No resale passes yet</Text>
                <Text style={styles.emptyText}>Passes other travelers can no longer use will show up here, below the original price.</Text>
              </View>
            ) : null}
          </View>
        </>
      ) : (
        <>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Editor's picks</Text>
            <Text style={styles.sectionSub}>{picks.length} benefits nearby</Text>
          </View>
          <HScroll contentContainerStyle={styles.pickScroll}>
            {picks.map((p, i) => (
              <FadeInUp key={p.id} index={i}>
                <PickCard product={p} onPress={() => openDetail(p.id)} />
              </FadeInUp>
            ))}
          </HScroll>

          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>{filter === 'all' ? 'All benefits' : categoryLabels[filter]}</Text>
            <Text style={styles.sectionSub}>{list.length} available</Text>
          </View>
          <View style={styles.dealGrid}>
            {list.map((p, i) => (
              <FadeInUp key={p.id} index={i} style={styles.gridItem}>
                <DealCard product={p} onPress={() => openDetail(p.id)} gridWidth />
              </FadeInUp>
            ))}
            {list.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No matches</Text>
                <Text style={styles.emptyText}>Try a different search term or category.</Text>
              </View>
            ) : null}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: 32 },
  liveTicker: { flexDirection: 'row', alignItems: 'center', gap: 7, marginHorizontal: 20, marginTop: 10 },
  liveText: { fontSize: 11, color: colors.inkSoft, fontFamily: fonts.sans },
  searchWrap: { marginHorizontal: 20, marginTop: 14, marginBottom: 4 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.white,
    borderWidth: 1, borderColor: colors.line, paddingVertical: 11, paddingHorizontal: 14, borderRadius: radii.md,
  },
  searchInput: { flex: 1, color: colors.ink, fontSize: 13, fontFamily: fonts.sans, padding: 0 },
  chipRow: { marginTop: 14, marginBottom: 4 },
  chipRowContent: { paddingHorizontal: 20, gap: 8 },
  sectionHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 22, marginBottom: 10 },
  sectionTitle: { fontFamily: fonts.serif, fontSize: 17, color: colors.ink },
  sectionSub: { fontSize: 11.5, color: colors.primary, fontFamily: fonts.sansBold },
  pickScroll: { paddingHorizontal: 20, gap: 12 },
  dealList: { paddingHorizontal: 20, gap: 12 },
  dealGrid: { paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  gridItem: { width: '47%' },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyTitle: { fontFamily: fonts.serif, fontSize: 16, color: colors.ink, marginBottom: 6 },
  emptyText: { fontSize: 12.5, color: colors.inkSoft },
});
