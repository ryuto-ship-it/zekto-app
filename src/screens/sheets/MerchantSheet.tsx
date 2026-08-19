import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, categoryLabels, categoryAccents } from '../../theme/theme';
import { getMerchant } from '../../data/merchants';
import { getProductsByMerchant } from '../../data/products';
import { imgUrl } from '../../utils/format';
import Sheet from '../../components/Sheet';
import { DealCard } from '../../components/ProductCard';
import { RootStackParamList } from '../../navigation/types';

export default function MerchantSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Merchant'>>();
  const merchant = getMerchant(route.params.merchantId);
  const products = merchant ? getProductsByMerchant(merchant.id) : [];

  if (!merchant) return null;

  return (
    <Sheet onClose={() => navigation.goBack()}>
      <Image source={{ uri: imgUrl(merchant.image, 780) }} style={styles.cover} resizeMode="cover" />
      <View style={styles.head}>
        <Text style={[styles.cat, { color: categoryAccents[merchant.cat] }]}>{categoryLabels[merchant.cat]}</Text>
        <Text style={styles.name}>{merchant.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.stars}>★★★★★</Text>
          <Text style={styles.meta}>{merchant.rating}</Text>
          <Text style={styles.meta}>·</Text>
          <Text style={styles.meta}>{merchant.loc}</Text>
        </View>
        <View style={styles.zeroPayRow}>
          <Text style={styles.zeroPayText}>✓ ZeroPay merchant · connected via the nationwide 2M+ small-business network</Text>
        </View>
      </View>
      <Text style={styles.cap}>{products.length} products on sale · live</Text>
      <View style={styles.list}>
        {products.map((p) => (
          <DealCard key={p.id} product={p} onPress={() => navigation.replace('ProductDetail', { productId: p.id })} />
        ))}
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  cover: { width: '100%', height: 130, backgroundColor: colors.paper },
  head: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 6 },
  cat: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: colors.jade, fontFamily: fonts.sansBold },
  name: { fontFamily: fonts.serifMedium, fontSize: 20, marginTop: 5, marginBottom: 4, color: colors.ink },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  stars: { color: colors.gold, fontWeight: '700', fontSize: 12 },
  meta: { fontSize: 12, color: colors.inkSoft, fontFamily: fonts.sans },
  zeroPayRow: { marginTop: 8, backgroundColor: colors.jadeTint, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10, alignSelf: 'flex-start' },
  zeroPayText: { fontSize: 10.5, color: colors.jadeDeep, fontFamily: fonts.sansBold },
  cap: {
    marginHorizontal: 20, marginTop: 16, marginBottom: 8, fontSize: 11, textTransform: 'uppercase',
    letterSpacing: 0.6, color: colors.inkSoft, fontFamily: fonts.sansBold,
  },
  list: { paddingHorizontal: 20, gap: 12 },
});
