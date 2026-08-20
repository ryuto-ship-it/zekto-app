import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radii, shadows, categoryLabels, categoryAccents, categoryAccentTints } from '../theme/theme';
import { PRODUCTS, Category } from '../data/products';
import { won } from '../utils/format';
import PriceLadder from '../components/PriceLadder';
import Chip from '../components/Chip';
import { PickCard, DealCard } from '../components/ProductCard';
import { ResaleCard } from '../components/ResaleCard';
import { SearchIcon, CategoryIcon, DiscoverIcon } from '../components/Icons';
import { useApp } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';

const HERO_PRICE = { card: 95000, cash: 94050, coin: 92150 };

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
  const { resaleListings } = useApp();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

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
      <LinearGradient colors={['#1F4B3F', '#2F6B5A', '#256456']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={[styles.blob, styles.blobGold]} />
        <View style={[styles.blob, styles.blobMint]} />
        <View style={[styles.blob, styles.blobSmall]} />
        <Text style={styles.eyebrow}>FUTURE PASS · WORKS WHEN CARDS DON'T</Text>
        <Text style={styles.heroTitle}>Card declined in Korea? Prepay with stablecoin instead.</Text>
        <PriceLadder
          rows={[
            { label: 'Card', amount: HERO_PRICE.card, widthPct: 96, kind: 'card' },
            { label: 'Cash', amount: HERO_PRICE.cash, widthPct: 93, kind: 'cash' },
            { label: 'Stablecoin', amount: HERO_PRICE.coin, widthPct: 90, kind: 'coin' },
          ]}
          variant="hero"
          bestText={`ALWAYS ACCEPTED · ${won(HERO_PRICE.card - HERO_PRICE.coin)} CHEAPER`}
        />
        <Text style={styles.heroCaption}>We split the card-network fee we save with you.</Text>
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow} contentContainerStyle={styles.chipRowContent}>
        {CHIPS.map((c) => {
          const active = filter === c.key;
          const activeColor = c.cat ? categoryAccents[c.cat] : c.key === 'resale' ? colors.gold : colors.jade;
          const icon = c.cat ? (
            <CategoryIcon cat={c.cat} size={20} color={active ? colors.white : activeColor} strokeWidth={2} />
          ) : c.key === 'all' ? (
            <DiscoverIcon size={20} color={active ? colors.white : colors.jade} strokeWidth={2} />
          ) : null;
          return (
            <Chip
              key={c.key}
              label={c.key === 'resale' ? '🔁 ' + c.label : c.label}
              icon={icon}
              active={active}
              activeColor={activeColor}
              onPress={() => setFilter(c.key)}
            />
          );
        })}
      </ScrollView>

      {filter === 'resale' ? (
        <>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Other travelers are selling</Text>
            <Text style={styles.sectionSub}>{resaleListings.length} listed</Text>
          </View>
          <View style={styles.dealList}>
            {resaleListings.map((l) => (
              <ResaleCard key={l.id} listing={l} onPress={() => openResale(l.productId, l.id)} />
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pickScroll}>
            {picks.map((p) => (
              <PickCard key={p.id} product={p} onPress={() => openDetail(p.id)} />
            ))}
          </ScrollView>

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
  blob: { position: 'absolute', borderRadius: 999 },
  blobGold: { width: 180, height: 180, top: -70, right: -50, backgroundColor: 'rgba(232,169,59,0.35)' },
  blobMint: { width: 140, height: 140, bottom: -60, left: -40, backgroundColor: 'rgba(125,211,222,0.18)' },
  blobSmall: { width: 70, height: 70, top: 40, right: 30, backgroundColor: 'rgba(255,255,255,0.10)' },
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
  sectionSub: { fontSize: 11.5, color: colors.jade, fontFamily: fonts.sansBold },
  pickScroll: { paddingHorizontal: 20, gap: 12 },
  dealList: { paddingHorizontal: 20, gap: 12 },
  dealGrid: { paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  gridItem: { width: '47%' },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyTitle: { fontFamily: fonts.serif, fontSize: 16, color: colors.ink, marginBottom: 6 },
  emptyText: { fontSize: 12.5, color: colors.inkSoft },
});
