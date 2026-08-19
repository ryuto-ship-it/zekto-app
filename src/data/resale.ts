import { Category } from './products';

export type ResaleListing = {
  id: string;
  productId: number;
  title: string;
  merchant: string;
  loc: string;
  cat: Category;
  image: string;
  originalPrice: number;
  resalePrice: number;
  sellerLabel: string;
  ownPassUid?: number;
};

// A few "other traveler" listings so the Resale tab isn't empty before the
// current user lists anything themselves. Purely mock data — no real sellers.
export const SEED_RESALE_LISTINGS: ResaleListing[] = [
  {
    id: 'seed-1',
    productId: 5,
    title: 'Deluxe City View Suite · 2 Nights',
    merchant: 'Myeongdong Grand Hotel',
    loc: 'Myeongdong, Seoul',
    cat: 'hotel',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
    originalPrice: 950600,
    resalePrice: 807000,
    sellerLabel: 'Traveler #4821',
  },
  {
    id: 'seed-2',
    productId: 11,
    title: 'Rooftop BBQ & Makgeolli Flight for Two',
    merchant: 'Seoul Sky BBQ House',
    loc: 'Yongsan-gu, Seoul',
    cat: 'dining',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    originalPrice: 145500,
    resalePrice: 110000,
    sellerLabel: 'Traveler #1092',
  },
  {
    id: 'seed-3',
    productId: 3,
    title: 'Water-Glow Injection + Rejuran Healer Combo',
    merchant: 'Aurora Dermatology',
    loc: 'Apgujeong, Seoul',
    cat: 'beauty',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c',
    originalPrice: 624000,
    resalePrice: 530000,
    sellerLabel: 'Traveler #7734',
  },
];

export const RESALE_MIN_PCT = 0.5;
export const RESALE_MAX_PCT = 1.0;
export const RESALE_PRESET_PCTS = [0.5, 0.65, 0.8, 1.0];
