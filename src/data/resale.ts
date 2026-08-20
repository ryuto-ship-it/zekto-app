import { Category } from './products';

export type ChatMessage = {
  id: string;
  sender: 'buyer' | 'me';
  text: string;
  time: string;
};

export type ChatThread = {
  id: string;
  buyerName: string;
  messages: ChatMessage[];
  unread: number;
};

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
  description?: string;
  views: number;
  likes: number;
  likedByMe: boolean;
  status: 'active' | 'sold';
  chats: ChatThread[];
};

export const DESCRIPTION_PLACEHOLDER = 'e.g. Plans changed, selling this last minute — still fully valid!';

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
    description: 'Trip got rescheduled to next month, can\'t use this pass on the original dates anymore.',
    views: 34,
    likes: 6,
    likedByMe: false,
    status: 'active',
    chats: [],
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
    description: 'Bought two by accident — this one is untouched and valid for another 80 days.',
    views: 21,
    likes: 3,
    likedByMe: false,
    status: 'active',
    chats: [],
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
    description: 'Skin reacted to something else this trip so my derm advised against another treatment right now.',
    views: 40,
    likes: 8,
    likedByMe: false,
    status: 'active',
    chats: [],
  },
];

const BUYER_NAMES = ['Traveler #2210', 'Traveler #6634', 'Traveler #9047'];

// A ready-made buyer inquiry, generated as soon as you list a pass, so the
// resale market feels active immediately instead of starting silent.
export function seedChatThread(): ChatThread {
  return {
    id: `thread-${Date.now()}`,
    buyerName: BUYER_NAMES[Math.floor(Math.random() * BUYER_NAMES.length)],
    unread: 1,
    messages: [
      { id: 'm1', sender: 'buyer', text: 'Hi! Is this still available?', time: '2m ago' },
      { id: 'm2', sender: 'buyer', text: 'Would you take a little less if I pay right now?', time: '1m ago' },
    ],
  };
}

export const RESALE_MIN_PCT = 0.5;
export const RESALE_MAX_PCT = 1.0;
export const RESALE_PRESET_PCTS = [0.5, 0.65, 0.8, 1.0];
