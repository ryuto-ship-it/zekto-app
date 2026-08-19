import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, categoryLabels } from '../../theme/theme';
import { getProduct } from '../../data/products';
import { won, finalPrice, imgUrl } from '../../utils/format';
import Sheet from '../../components/Sheet';
import PriceLadder from '../../components/PriceLadder';
import { PrimaryButton } from '../../components/Buttons';
import { RootStackParamList } from '../../navigation/types';

export default function ProductDetailSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const product = getProduct(route.params.productId);

  if (!product) return null;

  const cardPrice = finalPrice(product.price, product.cardPct);
  const cashPrice = finalPrice(product.price, product.cashPct);
  const coinPrice = finalPrice(product.price, product.coinPct);

  return (
    <Sheet
      onClose={() => navigation.goBack()}
      footer={
        <>
          <View style={styles.ctaPrice}>
            <Text style={styles.ctaWas}>{won(product.price)}</Text>
            <Text style={styles.ctaNow}>{won(coinPrice)}</Text>
          </View>
          <PrimaryButton label="Buy this Pass" onPress={() => navigation.navigate('Purchase', { productId: product.id })} />
        </>
      }
    >
      <Image source={{ uri: imgUrl(product.image, 780) }} style={styles.hero} resizeMode="cover" />
      <View style={styles.body}>
        <Text style={styles.cat}>{categoryLabels[product.cat]}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.merchant}>📍 {product.merchant} · {product.loc}</Text>
        <Text style={styles.desc}>{product.desc}</Text>

        <View style={styles.aiBadge}>
          <Text style={styles.aiText}>
            ✨ <Text style={styles.aiBold}>SSDA AI</Text> found your best benefit and applied it automatically — no codes to enter.
          </Text>
        </View>

        <View style={styles.ladderCard}>
          <Text style={styles.ladderCap}>Same benefit, three ways to pay</Text>
          <PriceLadder
            variant="detail"
            rows={[
              { label: 'Card', amount: cardPrice, widthPct: 95, kind: 'card' },
              { label: 'Cash', amount: cashPrice, widthPct: 88, kind: 'cash' },
              { label: 'Stablecoin', amount: coinPrice, widthPct: Math.max(30, 100 - product.coinPct * 2), kind: 'coin' },
            ]}
            bestText={`BEST · ${won(product.price - coinPrice)} CHEAPER THAN CARD`}
          />
        </View>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  hero: { width: '100%', height: 190, backgroundColor: colors.paper },
  body: { paddingHorizontal: 20 },
  cat: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: colors.jade, fontFamily: fonts.sansBold, marginTop: 16 },
  title: { fontFamily: fonts.serifMedium, fontSize: 21, marginTop: 6, marginBottom: 4, color: colors.ink, lineHeight: 26 },
  merchant: { fontSize: 12.5, color: colors.inkSoft, fontFamily: fonts.sans },
  desc: { fontSize: 13, color: colors.inkSoft, lineHeight: 20, marginVertical: 14, fontFamily: fonts.sans },
  aiBadge: { flexDirection: 'row', backgroundColor: colors.goldTint, borderWidth: 1, borderColor: '#E4D6A8', padding: 12, borderRadius: 12, marginVertical: 14 },
  aiText: { fontSize: 11.5, color: '#7A6023', flex: 1, fontFamily: fonts.sans },
  aiBold: { color: '#5E4A1A', fontFamily: fonts.sansBold },
  ladderCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 16, padding: 14, marginVertical: 14 },
  ladderCap: { fontSize: 10.5, textTransform: 'uppercase', letterSpacing: 0.6, color: colors.inkSoft, fontFamily: fonts.sansBold, marginBottom: 10 },
  ctaPrice: {},
  ctaWas: { fontSize: 11, color: '#9AA79D', textDecorationLine: 'line-through', fontFamily: fonts.mono },
  ctaNow: { fontFamily: fonts.monoSemiBold, fontSize: 18, color: colors.jadeDeep },
});
