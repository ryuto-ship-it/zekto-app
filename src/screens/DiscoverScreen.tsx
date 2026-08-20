import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii, shadows, categoryLabels, categoryAccents, categoryAccentTints, categoryColors } from '../theme/theme';
import { PRODUCTS, Category } from '../data/products';
import Chip from '../components/Chip';
import { PickCard, DealCard } from '../components/ProductCard';
import { ResaleCard } from '../components/ResaleCard';
import { SearchIcon, CategoryIcon, DiscoverIcon } from '../components/Icons';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';
import HScroll from '../components/HScroll';

type Filter = 'all' | Category | 'resale';

const CHIPS: { key: Filter; label: string; cat?: Category }[] = [
  { key: 'all', label: 'All' },
  { key: 'beauty', label: 'Beauty & Medical', cat: 'beauty' },
  { key: 'hotel', label: 'Hotels', cat: 'hotel' },
  { key: 'dining', label: 'Dining', cat: 'dining' },
  { key: 'resale', label: 'Resale' },
];

export default function DiscoverScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { resaleListings, toggleLike, bumpListingViews } = useApp();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (filter === 'resale') bumpListingViews();
    // Only re-fire when the Resale tab is (re-)selected, not on every listing update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

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

  const screenBg = filter === 'beauty' || filter === 'hotel' || filter === 'dining' ? categoryAccentTints[filter] : colors.paper;

  return (
    <ScrollView style={[styles.screen, { backgroundColor: screenBg }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[colors.primary, colors.primaryLight]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={[styles.blob, styles.blobBig]} />
        <View style={[styles.blob, styles.blobSmall]} />
        <Text style={styles.eyebrow}>CURATED FOR YOUR TRIP</Text>
        <Text style={styles.heroTitle}>Korea, curated. Book the best clinics, stays, and tables before you land.</Text>
        <Text style={styles.heroCaption}>
          Pay however's easiest — card, cash, or stablecoin. What we care about first is what you want to do in Korea.
        </Text>
      </LinearGradient>

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
            {resaleListings.map((l) => (
              <ResaleCard
                key={l.id}
                listing={l}
                onPress={() => openResale(l.productId, l.id)}
                onToggleLike={() => toggleLike(l.id)}
              />
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
            {picks.map((p) => (
              <PickCard key={p.id} product={p} onPress={() => openDetail(p.id)} />
            ))}
          </HScroll>

          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>{filter === 'all' ? 'All benefits' : categoryLabels[filter]}</Text>
            <Text style={styles.sectionSub}>{list.length} available</Text>
          </View>
          <View style={styles.dealGrid}>
            {list.map((p) => (
              <View key={p.id} style={styles.gridItem}>
                <DealCard product={p} onPress={() => openDetail(p.id)} gridWidth />
              </View>
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
  hero: {
    margin: 20,
    marginBottom: 6,
    padding: 20,
    paddingTop: 22,
    borderRadius: radii.xxl,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.cardLarge,
  },
  blob: { position: 'absolute', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.08)' },
  blobBig: { width: 200, height: 200, top: -80, right: -60 },
  blobSmall: { width: 110, height: 110, top: 30, right: 40 },
  eyebrow: { fontFamily: fonts.monoMedium, fontSize: 10.5, letterSpacing: 1.4, color: colors.goldTint, opacity: 0.9 },
  heroTitle: { fontFamily: fonts.serifBold, fontSize: 28, lineHeight: 33, color: colors.white, marginTop: 10, marginBottom: 16, maxWidth: 260 },
  heroCaption: { fontSize: 10.5, color: '#C9D6CE', marginTop: 8, fontFamily: fonts.sans },
  searchWrap: { marginHorizontal: 20, marginTop: 16, marginBottom: 4 },
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
