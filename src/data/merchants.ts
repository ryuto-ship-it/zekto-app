import { Category, getProductsByMerchant } from './products';

export type Merchant = {
  id: string;
  name: string;
  cat: Category;
  loc: string;
  rating: number;
  pos: { left: `${number}%`; top: `${number}%` };
  image: string;
};

export const MERCHANTS: Merchant[] = [
  {
    id: 'm1',
    name: 'Cheongdam Aesthetic Clinic',
    cat: 'beauty',
    loc: 'Gangnam-gu, Seoul',
    rating: 4.9,
    pos: { left: '30%', top: '28%' },
    image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53',
  },
  {
    id: 'm2',
    name: 'Aurora Dermatology',
    cat: 'beauty',
    loc: 'Apgujeong, Seoul',
    rating: 4.8,
    pos: { left: '64%', top: '20%' },
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c',
  },
  {
    id: 'm3',
    name: 'Myeongdong Grand Hotel',
    cat: 'hotel',
    loc: 'Myeongdong, Seoul',
    rating: 4.7,
    pos: { left: '70%', top: '40%' },
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
  },
  {
    id: 'm4',
    name: 'Bukchon Hanok House',
    cat: 'hotel',
    loc: 'Jongno-gu, Seoul',
    rating: 4.9,
    pos: { left: '46%', top: '74%' },
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
  },
  {
    id: 'm5',
    name: 'Hanok Table Restaurant',
    cat: 'dining',
    loc: 'Insadong, Seoul',
    rating: 4.8,
    pos: { left: '18%', top: '66%' },
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
  },
  {
    id: 'm6',
    name: 'Seoul Sky BBQ House',
    cat: 'dining',
    loc: 'Yongsan-gu, Seoul',
    rating: 4.6,
    pos: { left: '82%', top: '68%' },
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
  },
];

export function getMerchant(id: string): Merchant | undefined {
  return MERCHANTS.find((m) => m.id === id);
}

// Badge shows the best (largest) stablecoin discount available at this merchant.
export function merchantBestCoinPct(mid: string): number {
  const items = getProductsByMerchant(mid);
  return items.length ? Math.max(...items.map((p) => p.coinPct)) : 0;
}

// Deterministic pseudo-distance so it stays stable across renders without real geolocation.
export function merchantDist(mid: string): string {
  let seed = 0;
  for (const ch of mid) seed += ch.charCodeAt(0);
  return (0.3 + (seed % 14) / 10).toFixed(1) + ' km';
}
