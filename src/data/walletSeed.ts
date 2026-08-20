import type { Pass } from '../context/AppContext';
import { getProduct } from './products';
import { finalPrice } from '../utils/format';
import { CoinSymbol } from '../types/purchase';

type SeedSpec = { productId: number; used: boolean; coin: CoinSymbol; code: string; source: string };

// 18 passes already purchased before first app open, so Wallet reads as a
// real returning traveler's account instead of an empty first-run state:
// 6 beauty (5 different clinics, one clinic visited twice), 2 hotel
// (2 different hotels), 10 dining (4 different restaurants, repeat visits
// at a couple of them). ~7 are already redeemed (USED), the rest VALID.
const SEED: SeedSpec[] = [
  // Beauty — 5 clinics (m1 x2, m2, m9, m10, m11)
  { productId: 1, used: false, coin: 'USDT', code: 'ZKT-482910', source: 'FuturePass Balance' },
  { productId: 2, used: true, coin: 'USDC', code: 'ZKT-118203', source: 'FuturePass Balance' },
  { productId: 3, used: false, coin: 'USDT', code: 'ZKT-773341', source: 'FuturePass Balance' },
  { productId: 15, used: true, coin: 'KRW1', code: 'ZKT-905512', source: 'FuturePass Balance' },
  { productId: 16, used: false, coin: 'USDT', code: 'ZKT-224098', source: 'FuturePass Balance' },
  { productId: 17, used: false, coin: 'USDC', code: 'ZKT-661487', source: 'FuturePass Balance' },

  // Hotel — 2 different hotels
  { productId: 5, used: true, coin: 'USDT', code: 'ZKT-330176', source: 'FuturePass Balance' },
  { productId: 7, used: false, coin: 'KRW1', code: 'ZKT-847263', source: 'FuturePass Balance' },

  // Dining — 4 restaurants, some repeat visits
  { productId: 9, used: false, coin: 'USDT', code: 'ZKT-509144', source: 'FuturePass Balance' },
  { productId: 9, used: true, coin: 'USDC', code: 'ZKT-509177', source: 'FuturePass Balance' },
  { productId: 10, used: false, coin: 'USDT', code: 'ZKT-671820', source: 'FuturePass Balance' },
  { productId: 11, used: true, coin: 'KRW1', code: 'ZKT-392015', source: 'FuturePass Balance' },
  { productId: 11, used: false, coin: 'USDT', code: 'ZKT-392048', source: 'FuturePass Balance' },
  { productId: 12, used: true, coin: 'USDC', code: 'ZKT-256730', source: 'FuturePass Balance' },
  { productId: 13, used: false, coin: 'USDT', code: 'ZKT-814409', source: 'FuturePass Balance' },
  { productId: 13, used: true, coin: 'KRW1', code: 'ZKT-814442', source: 'FuturePass Balance' },
  { productId: 14, used: false, coin: 'USDT', code: 'ZKT-967251', source: 'FuturePass Balance' },
  { productId: 14, used: false, coin: 'USDC', code: 'ZKT-967284', source: 'FuturePass Balance' },
];

export function buildSeedPasses(): Pass[] {
  return SEED.map((s, i) => {
    const product = getProduct(s.productId);
    if (!product) throw new Error(`walletSeed: unknown productId ${s.productId}`);
    const price = finalPrice(product.price, product.coinPct);
    return {
      uid: i + 1,
      productId: product.id,
      title: product.title,
      merchant: product.merchant,
      loc: product.loc,
      cat: product.cat,
      image: product.image,
      price,
      saved: product.price - price,
      code: s.code,
      used: s.used,
      coin: s.coin,
      source: s.source,
      resaleStatus: 'none',
    };
  });
}

export const SEED_PASS_COUNT = SEED.length;
