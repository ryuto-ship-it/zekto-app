export type Category = 'beauty' | 'hotel' | 'dining';

export type Product = {
  id: number;
  mid: string;
  cat: Category;
  title: string;
  merchant: string;
  loc: string;
  price: number;
  cardPct: number;
  cashPct: number;
  coinPct: number;
  rating: number;
  pick: boolean;
  image: string;
  desc: string;
};

// Stock photography only — no real clinic/hotel/restaurant photos or brand names.
// Pricing & bundle structure loosely modeled on typical Gangnam Unni / Yeoshin Ticket
// style tourist packages (Botox + skin booster combos, 5-star standard rooms, hansik
// tasting courses), but every merchant below is fictional.
export const PRODUCTS: Product[] = [
  {
    id: 1,
    mid: 'm1',
    cat: 'beauty',
    title: 'Signature Glow Facial + Botox Touch-Up',
    merchant: 'Cheongdam Aesthetic Clinic',
    loc: 'Gangnam-gu, Seoul',
    price: 420000,
    cardPct: 0,
    cashPct: 1,
    coinPct: 3,
    rating: 4.9,
    pick: true,
    image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53',
    desc: 'A dermatologist-led facial paired with a light botox touch-up. One of the most-booked first appointments for visitors trying a Korean clinic for the first time.',
  },
  {
    id: 2,
    mid: 'm1',
    cat: 'beauty',
    title: 'Hair-Loss PRP Booster',
    merchant: 'Cheongdam Aesthetic Clinic',
    loc: 'Gangnam-gu, Seoul',
    price: 280000,
    cardPct: 0,
    cashPct: 1,
    coinPct: 2,
    rating: 4.7,
    pick: false,
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35',
    desc: 'A single-session PRP scalp treatment popular with travelers extending a clinic visit into a full beauty day.',
  },
  {
    id: 3,
    mid: 'm2',
    cat: 'beauty',
    title: 'Premium Skin Rejuvenation Package',
    merchant: 'Aurora Dermatology',
    loc: 'Apgujeong, Seoul',
    price: 650000,
    cardPct: 0,
    cashPct: 2,
    coinPct: 4,
    rating: 4.8,
    pick: false,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c',
    desc: 'A three-step rejuvenation package combining laser toning, hydration infusion, and LED therapy, tailored to travel-tired skin.',
  },
  {
    id: 4,
    mid: 'm2',
    cat: 'beauty',
    title: 'V-Line Contour Consultation & Filler',
    merchant: 'Aurora Dermatology',
    loc: 'Apgujeong, Seoul',
    price: 520000,
    cardPct: 0,
    cashPct: 1,
    coinPct: 3,
    rating: 4.8,
    pick: false,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881',
    desc: 'A consultation with a facial-contour specialist followed by a light filler treatment, English-speaking staff on site.',
  },
  {
    id: 5,
    mid: 'm3',
    cat: 'hotel',
    title: 'Deluxe City View Suite · 2 Nights',
    merchant: 'Myeongdong Grand Hotel',
    loc: 'Myeongdong, Seoul',
    price: 980000,
    cardPct: 0,
    cashPct: 1,
    coinPct: 3,
    rating: 4.7,
    pick: true,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
    desc: 'Two nights in a deluxe suite overlooking the city, walking distance to Myeongdong shopping and street food streets.',
  },
  {
    id: 6,
    mid: 'm3',
    cat: 'hotel',
    title: 'Executive Suite + Airport Transfer',
    merchant: 'Myeongdong Grand Hotel',
    loc: 'Myeongdong, Seoul',
    price: 1450000,
    cardPct: 0,
    cashPct: 2,
    coinPct: 4,
    rating: 4.8,
    pick: false,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843',
    desc: 'An upgraded executive suite for two nights bundled with a private airport pickup on arrival.',
  },
  {
    id: 7,
    mid: 'm4',
    cat: 'hotel',
    title: 'Hanok Stay Experience · 1 Night',
    merchant: 'Bukchon Hanok House',
    loc: 'Jongno-gu, Seoul',
    price: 340000,
    cardPct: 0,
    cashPct: 1,
    coinPct: 2,
    rating: 4.9,
    pick: false,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
    desc: 'A night in a restored traditional hanok in Bukchon, including a tea ceremony and hanbok rental for the evening.',
  },
  {
    id: 8,
    mid: 'm4',
    cat: 'hotel',
    title: 'Hanbok + Tea Ceremony Add-on',
    merchant: 'Bukchon Hanok House',
    loc: 'Jongno-gu, Seoul',
    price: 90000,
    cardPct: 0,
    cashPct: 1,
    coinPct: 2,
    rating: 4.9,
    pick: false,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f',
    desc: 'Add a private hanbok fitting and tea ceremony session to any hanok stay, best booked the day before check-in.',
  },
  {
    id: 9,
    mid: 'm5',
    cat: 'dining',
    title: '8-Course Hansik Tasting Menu',
    merchant: 'Hanok Table Restaurant',
    loc: 'Insadong, Seoul',
    price: 180000,
    cardPct: 0,
    cashPct: 1,
    coinPct: 3,
    rating: 4.8,
    pick: true,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
    desc: 'An eight-course seasonal tasting menu rooted in traditional Korean royal court cuisine, for two guests.',
  },
  {
    id: 10,
    mid: 'm5',
    cat: 'dining',
    title: 'Private Dining Room for 6',
    merchant: 'Hanok Table Restaurant',
    loc: 'Insadong, Seoul',
    price: 540000,
    cardPct: 0,
    cashPct: 2,
    coinPct: 3,
    rating: 4.8,
    pick: false,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    desc: 'A reserved private room with a set banquet menu, popular for family groups traveling together.',
  },
  {
    id: 11,
    mid: 'm6',
    cat: 'dining',
    title: 'Rooftop BBQ & Makgeolli Set for Two',
    merchant: 'Seoul Sky BBQ House',
    loc: 'Yongsan-gu, Seoul',
    price: 150000,
    cardPct: 0,
    cashPct: 1,
    coinPct: 3,
    rating: 4.6,
    pick: false,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    desc: 'Premium hanwoo BBQ set with a rooftop skyline view, paired with a curated makgeolli flight for two.',
  },
  {
    id: 12,
    mid: 'm6',
    cat: 'dining',
    title: 'Hanwoo Premium Platter',
    merchant: 'Seoul Sky BBQ House',
    loc: 'Yongsan-gu, Seoul',
    price: 210000,
    cardPct: 0,
    cashPct: 2,
    coinPct: 4,
    rating: 4.6,
    pick: false,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    desc: 'An upgraded hanwoo cut platter for two, the most-ordered add-on among the rooftop BBQ regulars.',
  },
];

export function getProduct(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByMerchant(mid: string): Product[] {
  return PRODUCTS.filter((p) => p.mid === mid);
}
