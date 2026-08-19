import { Category, getProductsByMerchant } from './products';

export type Coords = { latitude: number; longitude: number };

export type Merchant = {
  id: string;
  name: string;
  cat: Category;
  loc: string;
  rating: number;
  coords: Coords;
  image: string;
};

export const MERCHANTS: Merchant[] = [
  {
    id: 'm1',
    name: 'Cheongdam Aesthetic Clinic',
    cat: 'beauty',
    loc: 'Gangnam-gu, Seoul',
    rating: 4.9,
    coords: { latitude: 37.5178, longitude: 127.0485 },
    image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53',
  },
  {
    id: 'm2',
    name: 'Aurora Dermatology',
    cat: 'beauty',
    loc: 'Apgujeong, Seoul',
    rating: 4.8,
    coords: { latitude: 37.5274, longitude: 127.0286 },
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c',
  },
  {
    id: 'm3',
    name: 'Myeongdong Grand Hotel',
    cat: 'hotel',
    loc: 'Myeongdong, Seoul',
    rating: 4.7,
    coords: { latitude: 37.5636, longitude: 126.9850 },
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
  },
  {
    id: 'm4',
    name: 'Bukchon Hanok House',
    cat: 'hotel',
    loc: 'Jongno-gu, Seoul',
    rating: 4.9,
    coords: { latitude: 37.5826, longitude: 126.9838 },
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
  },
  {
    id: 'm5',
    name: 'Hanok Table Restaurant',
    cat: 'dining',
    loc: 'Insadong, Seoul',
    rating: 4.8,
    coords: { latitude: 37.5740, longitude: 126.9857 },
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
  },
  {
    id: 'm6',
    name: 'Seoul Sky BBQ House',
    cat: 'dining',
    loc: 'Yongsan-gu, Seoul',
    rating: 4.6,
    coords: { latitude: 37.5311, longitude: 126.9810 },
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
  },
  {
    id: 'm7',
    name: 'Sora Edomae Sushi',
    cat: 'dining',
    loc: 'Cheongdam-dong, Seoul',
    rating: 4.9,
    coords: { latitude: 37.5202, longitude: 127.0473 },
    image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be',
  },
  {
    id: 'm8',
    name: 'Seocho Table',
    cat: 'dining',
    loc: 'Seocho-gu, Seoul',
    rating: 4.9,
    coords: { latitude: 37.4837, longitude: 127.0324 },
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
  },
];

// "You" marker — placed in Myeongdong, the default map center.
export const YOU_COORDS: Coords = { latitude: 37.5615, longitude: 126.9865 };

// Bounding box the fallback (web) map and the native map's initial region are
// both fit to, so every merchant pin lands on-screen without manual per-pin tuning.
export const MAP_BOUNDS = {
  minLat: 37.478,
  maxLat: 37.592,
  minLng: 126.905,
  maxLng: 127.065,
};

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
