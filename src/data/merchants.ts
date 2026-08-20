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
  {
    id: 'm9',
    name: 'Apgujeong Glow Clinic',
    cat: 'beauty',
    loc: 'Apgujeong, Seoul',
    rating: 4.7,
    coords: { latitude: 37.5266, longitude: 127.0335 },
    image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6',
  },
  {
    id: 'm10',
    name: 'Sinsa Derma Lab',
    cat: 'beauty',
    loc: 'Sinsa-dong, Seoul',
    rating: 4.8,
    coords: { latitude: 37.5172, longitude: 127.0202 },
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9',
  },
  {
    id: 'm11',
    name: 'Gangnam Prime Dermatology',
    cat: 'beauty',
    loc: 'Gangnam-gu, Seoul',
    rating: 4.9,
    coords: { latitude: 37.4979, longitude: 127.0276 },
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be',
  },

  // ---------------- Beauty & Medical — Gangnam ----------------
  { id: 'm12', name: 'Gangnam Skin Republic Clinic', cat: 'beauty', loc: 'Gangnam-gu, Seoul', rating: 4.7, coords: { latitude: 37.5014, longitude: 127.0248 }, image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53' },
  { id: 'm13', name: 'Yeoksam Glow Dermatology', cat: 'beauty', loc: 'Gangnam-gu, Seoul', rating: 4.6, coords: { latitude: 37.4948, longitude: 127.0318 }, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c' },
  { id: 'm14', name: 'Gangnam Renew Aesthetic Center', cat: 'beauty', loc: 'Gangnam-gu, Seoul', rating: 4.8, coords: { latitude: 37.5001, longitude: 127.0331 }, image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6' },
  { id: 'm15', name: 'Seolleung Line Clinic', cat: 'beauty', loc: 'Gangnam-gu, Seoul', rating: 4.7, coords: { latitude: 37.4931, longitude: 127.0257 }, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9' },

  // ---------------- Beauty & Medical — Cheongdam ----------------
  { id: 'm16', name: 'Cheongdam 454 Clinic', cat: 'beauty', loc: 'Cheongdam-dong, Seoul', rating: 4.8, coords: { latitude: 37.5207, longitude: 127.0445 }, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be' },
  { id: 'm17', name: 'Cheongdam Luxe Dermatology', cat: 'beauty', loc: 'Cheongdam-dong, Seoul', rating: 4.9, coords: { latitude: 37.5141, longitude: 127.0515 }, image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53' },
  { id: 'm18', name: 'The Cheongdam Skin Clinic', cat: 'beauty', loc: 'Cheongdam-dong, Seoul', rating: 4.7, coords: { latitude: 37.5194, longitude: 127.0528 }, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c' },
  { id: 'm19', name: 'Cheongdam Renaissance Clinic', cat: 'beauty', loc: 'Cheongdam-dong, Seoul', rating: 4.8, coords: { latitude: 37.5124, longitude: 127.0454 }, image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6' },

  // ---------------- Beauty & Medical — Apgujeong ----------------
  { id: 'm20', name: 'Apgujeong Rodeo Skin Studio', cat: 'beauty', loc: 'Apgujeong, Seoul', rating: 4.7, coords: { latitude: 37.5309, longitude: 127.0258 }, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9' },
  { id: 'm21', name: 'Apgujeong Signature Dermatology', cat: 'beauty', loc: 'Apgujeong, Seoul', rating: 4.8, coords: { latitude: 37.5243, longitude: 127.0328 }, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be' },
  { id: 'm22', name: 'Apgujeong Glam Aesthetic Lounge', cat: 'beauty', loc: 'Apgujeong, Seoul', rating: 4.6, coords: { latitude: 37.5296, longitude: 127.0341 }, image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53' },

  // ---------------- Beauty & Medical — Sinsa-dong ----------------
  { id: 'm23', name: 'Sinsa Line Dermatology', cat: 'beauty', loc: 'Sinsa-dong, Seoul', rating: 4.8, coords: { latitude: 37.5198, longitude: 127.0173 }, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c' },
  { id: 'm24', name: 'Sinsa Garosu-gil Skin Clinic', cat: 'beauty', loc: 'Sinsa-dong, Seoul', rating: 4.7, coords: { latitude: 37.5132, longitude: 127.0243 }, image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6' },
  { id: 'm25', name: 'Sinsa Premium Aesthetic Center', cat: 'beauty', loc: 'Sinsa-dong, Seoul', rating: 4.9, coords: { latitude: 37.5185, longitude: 127.0256 }, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9' },
  { id: 'm26', name: 'Sinsa White Clinic', cat: 'beauty', loc: 'Sinsa-dong, Seoul', rating: 4.6, coords: { latitude: 37.5115, longitude: 127.0182 }, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be' },

  // ---------------- Hotels ----------------
  { id: 'm27', name: 'Myeongdong Central Hotel', cat: 'hotel', loc: 'Myeongdong, Seoul', rating: 4.6, coords: { latitude: 37.5671, longitude: 126.9822 }, image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32' },
  { id: 'm28', name: 'Myeongdong Skyline Suites', cat: 'hotel', loc: 'Myeongdong, Seoul', rating: 4.7, coords: { latitude: 37.5605, longitude: 126.9892 }, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843' },
  { id: 'm29', name: 'Gangnam Business Hotel', cat: 'hotel', loc: 'Gangnam-gu, Seoul', rating: 4.5, coords: { latitude: 37.5037, longitude: 127.0287 }, image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32' },
  { id: 'm30', name: 'Gangnam Riverside Residence', cat: 'hotel', loc: 'Gangnam-gu, Seoul', rating: 4.7, coords: { latitude: 37.4964, longitude: 127.0224 }, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843' },
  { id: 'm31', name: 'Itaewon Boutique Hotel', cat: 'hotel', loc: 'Itaewon-dong, Seoul', rating: 4.6, coords: { latitude: 37.5346, longitude: 126.9782 }, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427' },
  { id: 'm32', name: 'Itaewon Global House', cat: 'hotel', loc: 'Itaewon-dong, Seoul', rating: 4.5, coords: { latitude: 37.5280, longitude: 126.9852 }, image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32' },
  { id: 'm33', name: 'Hongdae Design Hotel', cat: 'hotel', loc: 'Mapo-gu, Seoul', rating: 4.7, coords: { latitude: 37.5598, longitude: 126.9192 }, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843' },

  // ---------------- Dining — Myeongdong ----------------
  { id: 'm34', name: 'Myeongdong Noodle House', cat: 'dining', loc: 'Myeongdong, Seoul', rating: 4.5, coords: { latitude: 37.5658, longitude: 126.9905 }, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733' },
  { id: 'm35', name: 'Myeongdong Street Kitchen', cat: 'dining', loc: 'Myeongdong, Seoul', rating: 4.6, coords: { latitude: 37.5588, longitude: 126.9831 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947' },

  // ---------------- Dining — Seongsu ----------------
  { id: 'm36', name: 'Seongsu Brick Oven Pizzeria', cat: 'dining', loc: 'Seongsu-dong, Seoul', rating: 4.7, coords: { latitude: 37.5480, longitude: 127.0529 }, image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be' },
  { id: 'm37', name: 'Seongsu Warehouse Grill', cat: 'dining', loc: 'Seongsu-dong, Seoul', rating: 4.6, coords: { latitude: 37.5414, longitude: 127.0599 }, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
  { id: 'm38', name: 'Seongsu Craft Brunch Café', cat: 'dining', loc: 'Seongsu-dong, Seoul', rating: 4.8, coords: { latitude: 37.5467, longitude: 127.0612 }, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061' },

  // ---------------- Dining — Hongdae ----------------
  { id: 'm39', name: 'Hongdae Night Market Kitchen', cat: 'dining', loc: 'Hongdae, Seoul', rating: 4.5, coords: { latitude: 37.5532, longitude: 126.9262 }, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e' },
  { id: 'm40', name: 'Hongdae Fusion Izakaya', cat: 'dining', loc: 'Hongdae, Seoul', rating: 4.6, coords: { latitude: 37.5585, longitude: 126.9275 }, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733' },
  { id: 'm41', name: 'Hongdae Rooftop Chicken & Beer', cat: 'dining', loc: 'Hongdae, Seoul', rating: 4.7, coords: { latitude: 37.5515, longitude: 126.9201 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947' },

  // ---------------- Dining — Gangnam ----------------
  { id: 'm42', name: 'Gangnam Station Hanwoo House', cat: 'dining', loc: 'Gangnam-gu, Seoul', rating: 4.7, coords: { latitude: 37.5020, longitude: 127.0215 }, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
  { id: 'm43', name: 'Gangnam Modern Korean Table', cat: 'dining', loc: 'Gangnam-gu, Seoul', rating: 4.8, coords: { latitude: 37.4917, longitude: 127.0309 }, image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be' },

  // ---------------- Dining — Apgujeong ----------------
  { id: 'm44', name: 'Apgujeong Wine & Tapas Bar', cat: 'dining', loc: 'Apgujeong, Seoul', rating: 4.6, coords: { latitude: 37.5226, longitude: 127.0267 }, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061' },
  { id: 'm45', name: 'Apgujeong Garden Brasserie', cat: 'dining', loc: 'Apgujeong, Seoul', rating: 4.8, coords: { latitude: 37.5332, longitude: 127.0297 }, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e' },

  // ---------------- Dining — Cheongdam ----------------
  { id: 'm46', name: 'Cheongdam French Dining Room', cat: 'dining', loc: 'Cheongdam-dong, Seoul', rating: 4.9, coords: { latitude: 37.5230, longitude: 127.0484 }, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733' },
  { id: 'm47', name: 'Cheongdam Teppanyaki Counter', cat: 'dining', loc: 'Cheongdam-dong, Seoul', rating: 4.8, coords: { latitude: 37.5157, longitude: 127.0421 }, image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be' },

  // ---------------- Dining — Yongsan ----------------
  { id: 'm48', name: 'Yongsan Han River Bistro', cat: 'dining', loc: 'Yongsan-gu, Seoul', rating: 4.7, coords: { latitude: 37.5333, longitude: 126.9865 }, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
  { id: 'm49', name: 'Yongsan Craft Noodle Bar', cat: 'dining', loc: 'Yongsan-gu, Seoul', rating: 4.6, coords: { latitude: 37.5263, longitude: 126.9791 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947' },
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
