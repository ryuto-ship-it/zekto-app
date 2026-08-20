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

  // ---------------- Density expansion: shopping + shows + extra beauty/hotel/dining, all 7 neighborhoods ----------------
  { id: 'm50', name: 'Myeongdong Glow Clinic', cat: 'beauty', loc: 'Myeongdong, Seoul', rating: 4.6, coords: { latitude: 37.5676, longitude: 126.9902 }, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c' },
  { id: 'm51', name: 'Myeongdong Renew Dermatology', cat: 'beauty', loc: 'Myeongdong, Seoul', rating: 4.8, coords: { latitude: 37.5563, longitude: 126.9837 }, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9' },
  { id: 'm52', name: 'Myeongdong Central Hotel', cat: 'hotel', loc: 'Myeongdong, Seoul', rating: 4.8, coords: { latitude: 37.5705, longitude: 126.9806 }, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427' },
  { id: 'm53', name: 'Myeongdong Skyline Suites', cat: 'hotel', loc: 'Myeongdong, Seoul', rating: 4.5, coords: { latitude: 37.5613, longitude: 126.9936 }, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843' },
  { id: 'm54', name: 'Myeongdong Kitchen', cat: 'dining', loc: 'Myeongdong, Seoul', rating: 4.5, coords: { latitude: 37.5592, longitude: 126.9765 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947' },
  { id: 'm55', name: 'Myeongdong Table', cat: 'dining', loc: 'Myeongdong, Seoul', rating: 4.7, coords: { latitude: 37.5732, longitude: 126.9885 }, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
  { id: 'm56', name: 'Myeongdong Grill House', cat: 'dining', loc: 'Myeongdong, Seoul', rating: 4.9, coords: { latitude: 37.5537, longitude: 126.9891 }, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e' },
  { id: 'm57', name: 'Myeongdong Concept Store', cat: 'shopping', loc: 'Myeongdong, Seoul', rating: 4.8, coords: { latitude: 37.5684, longitude: 126.9748 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm58', name: 'Myeongdong Fashion House', cat: 'shopping', loc: 'Myeongdong, Seoul', rating: 4.5, coords: { latitude: 37.5671, longitude: 126.9963 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm59', name: 'Myeongdong Boutique', cat: 'shopping', loc: 'Myeongdong, Seoul', rating: 4.7, coords: { latitude: 37.5529, longitude: 126.9788 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm60', name: 'Myeongdong Flagship Store', cat: 'shopping', loc: 'Myeongdong, Seoul', rating: 4.9, coords: { latitude: 37.5761, longitude: 126.9822 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm61', name: 'Myeongdong Style Lab', cat: 'shopping', loc: 'Myeongdong, Seoul', rating: 4.6, coords: { latitude: 37.5560, longitude: 126.9959 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm62', name: 'Myeongdong Design Shop', cat: 'shopping', loc: 'Myeongdong, Seoul', rating: 4.8, coords: { latitude: 37.5618, longitude: 126.9714 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm63', name: 'Myeongdong Atelier', cat: 'shopping', loc: 'Myeongdong, Seoul', rating: 4.5, coords: { latitude: 37.5744, longitude: 126.9941 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm64', name: 'Myeongdong Performance Hall', cat: 'show', loc: 'Myeongdong, Seoul', rating: 4.5, coords: { latitude: 37.5490, longitude: 126.9856 }, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
  { id: 'm65', name: 'Myeongdong Live Theater', cat: 'show', loc: 'Myeongdong, Seoul', rating: 4.7, coords: { latitude: 37.5742, longitude: 126.9744 }, image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b' },
  { id: 'm66', name: 'Myeongdong K-Show Stage', cat: 'show', loc: 'Myeongdong, Seoul', rating: 4.9, coords: { latitude: 37.5629, longitude: 127.0004 }, image: 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990' },
  { id: 'm67', name: 'Myeongdong Concert Hall', cat: 'show', loc: 'Myeongdong, Seoul', rating: 4.6, coords: { latitude: 37.5535, longitude: 126.9729 }, image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4' },
  { id: 'm68', name: 'Seongsu Glow Clinic', cat: 'beauty', loc: 'Seongsu, Seoul', rating: 4.9, coords: { latitude: 37.5485, longitude: 127.0609 }, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be' },
  { id: 'm69', name: 'Seongsu Renew Dermatology', cat: 'beauty', loc: 'Seongsu, Seoul', rating: 4.6, coords: { latitude: 37.5372, longitude: 127.0544 }, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c' },
  { id: 'm70', name: 'Seongsu Central Hotel', cat: 'hotel', loc: 'Seongsu, Seoul', rating: 4.6, coords: { latitude: 37.5514, longitude: 127.0513 }, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427' },
  { id: 'm71', name: 'Seongsu Skyline Suites', cat: 'hotel', loc: 'Seongsu, Seoul', rating: 4.8, coords: { latitude: 37.5422, longitude: 127.0643 }, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843' },
  { id: 'm72', name: 'Seongsu Kitchen', cat: 'dining', loc: 'Seongsu, Seoul', rating: 4.8, coords: { latitude: 37.5401, longitude: 127.0472 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947' },
  { id: 'm73', name: 'Seongsu Table', cat: 'dining', loc: 'Seongsu, Seoul', rating: 4.5, coords: { latitude: 37.5541, longitude: 127.0592 }, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
  { id: 'm74', name: 'Seongsu Grill House', cat: 'dining', loc: 'Seongsu, Seoul', rating: 4.7, coords: { latitude: 37.5346, longitude: 127.0598 }, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e' },
  { id: 'm75', name: 'Seongsu Concept Store', cat: 'shopping', loc: 'Seongsu, Seoul', rating: 4.6, coords: { latitude: 37.5493, longitude: 127.0455 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm76', name: 'Seongsu Fashion House', cat: 'shopping', loc: 'Seongsu, Seoul', rating: 4.8, coords: { latitude: 37.5480, longitude: 127.0670 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm77', name: 'Seongsu Boutique', cat: 'shopping', loc: 'Seongsu, Seoul', rating: 4.5, coords: { latitude: 37.5338, longitude: 127.0495 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm78', name: 'Seongsu Flagship Store', cat: 'shopping', loc: 'Seongsu, Seoul', rating: 4.7, coords: { latitude: 37.5570, longitude: 127.0529 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm79', name: 'Seongsu Style Lab', cat: 'shopping', loc: 'Seongsu, Seoul', rating: 4.9, coords: { latitude: 37.5369, longitude: 127.0666 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm80', name: 'Seongsu Design Shop', cat: 'shopping', loc: 'Seongsu, Seoul', rating: 4.6, coords: { latitude: 37.5427, longitude: 127.0421 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm81', name: 'Seongsu Atelier', cat: 'shopping', loc: 'Seongsu, Seoul', rating: 4.8, coords: { latitude: 37.5553, longitude: 127.0648 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm82', name: 'Seongsu Performance Hall', cat: 'show', loc: 'Seongsu, Seoul', rating: 4.8, coords: { latitude: 37.5299, longitude: 127.0563 }, image: 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990' },
  { id: 'm83', name: 'Seongsu Live Theater', cat: 'show', loc: 'Seongsu, Seoul', rating: 4.5, coords: { latitude: 37.5551, longitude: 127.0451 }, image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4' },
  { id: 'm84', name: 'Seongsu K-Show Stage', cat: 'show', loc: 'Seongsu, Seoul', rating: 4.7, coords: { latitude: 37.5438, longitude: 127.0711 }, image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae' },
  { id: 'm85', name: 'Seongsu Concert Hall', cat: 'show', loc: 'Seongsu, Seoul', rating: 4.9, coords: { latitude: 37.5344, longitude: 127.0436 }, image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34' },
  { id: 'm86', name: 'Hongdae Glow Clinic', cat: 'beauty', loc: 'Hongdae, Seoul', rating: 4.7, coords: { latitude: 37.5603, longitude: 126.9272 }, image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6' },
  { id: 'm87', name: 'Hongdae Renew Dermatology', cat: 'beauty', loc: 'Hongdae, Seoul', rating: 4.9, coords: { latitude: 37.5490, longitude: 126.9207 }, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be' },
  { id: 'm88', name: 'Hongdae Central Hotel', cat: 'hotel', loc: 'Hongdae, Seoul', rating: 4.9, coords: { latitude: 37.5632, longitude: 126.9176 }, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427' },
  { id: 'm89', name: 'Hongdae Skyline Suites', cat: 'hotel', loc: 'Hongdae, Seoul', rating: 4.6, coords: { latitude: 37.5540, longitude: 126.9306 }, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843' },
  { id: 'm90', name: 'Hongdae Kitchen', cat: 'dining', loc: 'Hongdae, Seoul', rating: 4.6, coords: { latitude: 37.5519, longitude: 126.9135 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947' },
  { id: 'm91', name: 'Hongdae Table', cat: 'dining', loc: 'Hongdae, Seoul', rating: 4.8, coords: { latitude: 37.5659, longitude: 126.9255 }, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
  { id: 'm92', name: 'Hongdae Grill House', cat: 'dining', loc: 'Hongdae, Seoul', rating: 4.5, coords: { latitude: 37.5464, longitude: 126.9261 }, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e' },
  { id: 'm93', name: 'Hongdae Concept Store', cat: 'shopping', loc: 'Hongdae, Seoul', rating: 4.9, coords: { latitude: 37.5611, longitude: 126.9118 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm94', name: 'Hongdae Fashion House', cat: 'shopping', loc: 'Hongdae, Seoul', rating: 4.6, coords: { latitude: 37.5598, longitude: 126.9333 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm95', name: 'Hongdae Boutique', cat: 'shopping', loc: 'Hongdae, Seoul', rating: 4.8, coords: { latitude: 37.5456, longitude: 126.9158 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm96', name: 'Hongdae Flagship Store', cat: 'shopping', loc: 'Hongdae, Seoul', rating: 4.5, coords: { latitude: 37.5688, longitude: 126.9192 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm97', name: 'Hongdae Style Lab', cat: 'shopping', loc: 'Hongdae, Seoul', rating: 4.7, coords: { latitude: 37.5487, longitude: 126.9329 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm98', name: 'Hongdae Design Shop', cat: 'shopping', loc: 'Hongdae, Seoul', rating: 4.9, coords: { latitude: 37.5545, longitude: 126.9084 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm99', name: 'Hongdae Atelier', cat: 'shopping', loc: 'Hongdae, Seoul', rating: 4.6, coords: { latitude: 37.5671, longitude: 126.9311 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm100', name: 'Hongdae Performance Hall', cat: 'show', loc: 'Hongdae, Seoul', rating: 4.6, coords: { latitude: 37.5417, longitude: 126.9226 }, image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae' },
  { id: 'm101', name: 'Hongdae Live Theater', cat: 'show', loc: 'Hongdae, Seoul', rating: 4.8, coords: { latitude: 37.5669, longitude: 126.9114 }, image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34' },
  { id: 'm102', name: 'Hongdae K-Show Stage', cat: 'show', loc: 'Hongdae, Seoul', rating: 4.5, coords: { latitude: 37.5556, longitude: 126.9374 }, image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3' },
  { id: 'm103', name: 'Hongdae Concert Hall', cat: 'show', loc: 'Hongdae, Seoul', rating: 4.7, coords: { latitude: 37.5462, longitude: 126.9099 }, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
  { id: 'm104', name: 'Gangnam Glow Clinic', cat: 'beauty', loc: 'Gangnam, Seoul', rating: 4.5, coords: { latitude: 37.5019, longitude: 127.0328 }, image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53' },
  { id: 'm105', name: 'Gangnam Renew Dermatology', cat: 'beauty', loc: 'Gangnam, Seoul', rating: 4.7, coords: { latitude: 37.4906, longitude: 127.0263 }, image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6' },
  { id: 'm106', name: 'Gangnam Central Hotel', cat: 'hotel', loc: 'Gangnam, Seoul', rating: 4.7, coords: { latitude: 37.5048, longitude: 127.0232 }, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427' },
  { id: 'm107', name: 'Gangnam Skyline Suites', cat: 'hotel', loc: 'Gangnam, Seoul', rating: 4.9, coords: { latitude: 37.4956, longitude: 127.0362 }, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843' },
  { id: 'm108', name: 'Gangnam Kitchen', cat: 'dining', loc: 'Gangnam, Seoul', rating: 4.9, coords: { latitude: 37.4935, longitude: 127.0191 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947' },
  { id: 'm109', name: 'Gangnam Table', cat: 'dining', loc: 'Gangnam, Seoul', rating: 4.6, coords: { latitude: 37.5075, longitude: 127.0311 }, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
  { id: 'm110', name: 'Gangnam Grill House', cat: 'dining', loc: 'Gangnam, Seoul', rating: 4.8, coords: { latitude: 37.4880, longitude: 127.0317 }, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e' },
  { id: 'm111', name: 'Gangnam Concept Store', cat: 'shopping', loc: 'Gangnam, Seoul', rating: 4.7, coords: { latitude: 37.5027, longitude: 127.0174 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm112', name: 'Gangnam Fashion House', cat: 'shopping', loc: 'Gangnam, Seoul', rating: 4.9, coords: { latitude: 37.5014, longitude: 127.0389 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm113', name: 'Gangnam Boutique', cat: 'shopping', loc: 'Gangnam, Seoul', rating: 4.6, coords: { latitude: 37.4872, longitude: 127.0214 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm114', name: 'Gangnam Flagship Store', cat: 'shopping', loc: 'Gangnam, Seoul', rating: 4.8, coords: { latitude: 37.5104, longitude: 127.0248 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm115', name: 'Gangnam Style Lab', cat: 'shopping', loc: 'Gangnam, Seoul', rating: 4.5, coords: { latitude: 37.4903, longitude: 127.0385 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm116', name: 'Gangnam Design Shop', cat: 'shopping', loc: 'Gangnam, Seoul', rating: 4.7, coords: { latitude: 37.4961, longitude: 127.0140 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm117', name: 'Gangnam Atelier', cat: 'shopping', loc: 'Gangnam, Seoul', rating: 4.9, coords: { latitude: 37.5087, longitude: 127.0367 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm118', name: 'Gangnam Performance Hall', cat: 'show', loc: 'Gangnam, Seoul', rating: 4.9, coords: { latitude: 37.4833, longitude: 127.0282 }, image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3' },
  { id: 'm119', name: 'Gangnam Live Theater', cat: 'show', loc: 'Gangnam, Seoul', rating: 4.6, coords: { latitude: 37.5085, longitude: 127.0170 }, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
  { id: 'm120', name: 'Gangnam K-Show Stage', cat: 'show', loc: 'Gangnam, Seoul', rating: 4.8, coords: { latitude: 37.4972, longitude: 127.0430 }, image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b' },
  { id: 'm121', name: 'Gangnam Concert Hall', cat: 'show', loc: 'Gangnam, Seoul', rating: 4.5, coords: { latitude: 37.4878, longitude: 127.0155 }, image: 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990' },
  { id: 'm122', name: 'Apgujeong Glow Clinic', cat: 'beauty', loc: 'Apgujeong, Seoul', rating: 4.8, coords: { latitude: 37.5314, longitude: 127.0338 }, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9' },
  { id: 'm123', name: 'Apgujeong Renew Dermatology', cat: 'beauty', loc: 'Apgujeong, Seoul', rating: 4.5, coords: { latitude: 37.5201, longitude: 127.0273 }, image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53' },
  { id: 'm124', name: 'Apgujeong Central Hotel', cat: 'hotel', loc: 'Apgujeong, Seoul', rating: 4.5, coords: { latitude: 37.5343, longitude: 127.0242 }, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427' },
  { id: 'm125', name: 'Apgujeong Skyline Suites', cat: 'hotel', loc: 'Apgujeong, Seoul', rating: 4.7, coords: { latitude: 37.5251, longitude: 127.0372 }, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843' },
  { id: 'm126', name: 'Apgujeong Kitchen', cat: 'dining', loc: 'Apgujeong, Seoul', rating: 4.7, coords: { latitude: 37.5230, longitude: 127.0201 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947' },
  { id: 'm127', name: 'Apgujeong Table', cat: 'dining', loc: 'Apgujeong, Seoul', rating: 4.9, coords: { latitude: 37.5370, longitude: 127.0321 }, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
  { id: 'm128', name: 'Apgujeong Grill House', cat: 'dining', loc: 'Apgujeong, Seoul', rating: 4.6, coords: { latitude: 37.5175, longitude: 127.0327 }, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e' },
  { id: 'm129', name: 'Apgujeong Concept Store', cat: 'shopping', loc: 'Apgujeong, Seoul', rating: 4.5, coords: { latitude: 37.5322, longitude: 127.0184 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm130', name: 'Apgujeong Fashion House', cat: 'shopping', loc: 'Apgujeong, Seoul', rating: 4.7, coords: { latitude: 37.5309, longitude: 127.0399 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm131', name: 'Apgujeong Boutique', cat: 'shopping', loc: 'Apgujeong, Seoul', rating: 4.9, coords: { latitude: 37.5167, longitude: 127.0224 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm132', name: 'Apgujeong Flagship Store', cat: 'shopping', loc: 'Apgujeong, Seoul', rating: 4.6, coords: { latitude: 37.5399, longitude: 127.0258 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm133', name: 'Apgujeong Style Lab', cat: 'shopping', loc: 'Apgujeong, Seoul', rating: 4.8, coords: { latitude: 37.5198, longitude: 127.0395 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm134', name: 'Apgujeong Design Shop', cat: 'shopping', loc: 'Apgujeong, Seoul', rating: 4.5, coords: { latitude: 37.5256, longitude: 127.0150 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm135', name: 'Apgujeong Atelier', cat: 'shopping', loc: 'Apgujeong, Seoul', rating: 4.7, coords: { latitude: 37.5382, longitude: 127.0377 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm136', name: 'Apgujeong Performance Hall', cat: 'show', loc: 'Apgujeong, Seoul', rating: 4.7, coords: { latitude: 37.5128, longitude: 127.0292 }, image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b' },
  { id: 'm137', name: 'Apgujeong Live Theater', cat: 'show', loc: 'Apgujeong, Seoul', rating: 4.9, coords: { latitude: 37.5380, longitude: 127.0180 }, image: 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990' },
  { id: 'm138', name: 'Apgujeong K-Show Stage', cat: 'show', loc: 'Apgujeong, Seoul', rating: 4.6, coords: { latitude: 37.5267, longitude: 127.0440 }, image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4' },
  { id: 'm139', name: 'Apgujeong Concert Hall', cat: 'show', loc: 'Apgujeong, Seoul', rating: 4.8, coords: { latitude: 37.5173, longitude: 127.0165 }, image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae' },
  { id: 'm140', name: 'Cheongdam Glow Clinic', cat: 'beauty', loc: 'Cheongdam, Seoul', rating: 4.6, coords: { latitude: 37.5212, longitude: 127.0525 }, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c' },
  { id: 'm141', name: 'Cheongdam Renew Dermatology', cat: 'beauty', loc: 'Cheongdam, Seoul', rating: 4.8, coords: { latitude: 37.5099, longitude: 127.0460 }, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9' },
  { id: 'm142', name: 'Cheongdam Central Hotel', cat: 'hotel', loc: 'Cheongdam, Seoul', rating: 4.8, coords: { latitude: 37.5241, longitude: 127.0429 }, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427' },
  { id: 'm143', name: 'Cheongdam Skyline Suites', cat: 'hotel', loc: 'Cheongdam, Seoul', rating: 4.5, coords: { latitude: 37.5149, longitude: 127.0559 }, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843' },
  { id: 'm144', name: 'Cheongdam Kitchen', cat: 'dining', loc: 'Cheongdam, Seoul', rating: 4.5, coords: { latitude: 37.5128, longitude: 127.0388 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947' },
  { id: 'm145', name: 'Cheongdam Table', cat: 'dining', loc: 'Cheongdam, Seoul', rating: 4.7, coords: { latitude: 37.5268, longitude: 127.0508 }, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
  { id: 'm146', name: 'Cheongdam Grill House', cat: 'dining', loc: 'Cheongdam, Seoul', rating: 4.9, coords: { latitude: 37.5073, longitude: 127.0514 }, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e' },
  { id: 'm147', name: 'Cheongdam Concept Store', cat: 'shopping', loc: 'Cheongdam, Seoul', rating: 4.8, coords: { latitude: 37.5220, longitude: 127.0371 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm148', name: 'Cheongdam Fashion House', cat: 'shopping', loc: 'Cheongdam, Seoul', rating: 4.5, coords: { latitude: 37.5207, longitude: 127.0586 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm149', name: 'Cheongdam Boutique', cat: 'shopping', loc: 'Cheongdam, Seoul', rating: 4.7, coords: { latitude: 37.5065, longitude: 127.0411 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm150', name: 'Cheongdam Flagship Store', cat: 'shopping', loc: 'Cheongdam, Seoul', rating: 4.9, coords: { latitude: 37.5297, longitude: 127.0445 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm151', name: 'Cheongdam Style Lab', cat: 'shopping', loc: 'Cheongdam, Seoul', rating: 4.6, coords: { latitude: 37.5096, longitude: 127.0582 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm152', name: 'Cheongdam Design Shop', cat: 'shopping', loc: 'Cheongdam, Seoul', rating: 4.8, coords: { latitude: 37.5154, longitude: 127.0337 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm153', name: 'Cheongdam Atelier', cat: 'shopping', loc: 'Cheongdam, Seoul', rating: 4.5, coords: { latitude: 37.5280, longitude: 127.0564 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm154', name: 'Cheongdam Performance Hall', cat: 'show', loc: 'Cheongdam, Seoul', rating: 4.5, coords: { latitude: 37.5026, longitude: 127.0479 }, image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4' },
  { id: 'm155', name: 'Cheongdam Live Theater', cat: 'show', loc: 'Cheongdam, Seoul', rating: 4.7, coords: { latitude: 37.5278, longitude: 127.0367 }, image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae' },
  { id: 'm156', name: 'Cheongdam K-Show Stage', cat: 'show', loc: 'Cheongdam, Seoul', rating: 4.9, coords: { latitude: 37.5165, longitude: 127.0627 }, image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34' },
  { id: 'm157', name: 'Cheongdam Concert Hall', cat: 'show', loc: 'Cheongdam, Seoul', rating: 4.6, coords: { latitude: 37.5071, longitude: 127.0352 }, image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3' },
  { id: 'm158', name: 'Yongsan Glow Clinic', cat: 'beauty', loc: 'Yongsan, Seoul', rating: 4.9, coords: { latitude: 37.5351, longitude: 126.9862 }, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be' },
  { id: 'm159', name: 'Yongsan Renew Dermatology', cat: 'beauty', loc: 'Yongsan, Seoul', rating: 4.6, coords: { latitude: 37.5238, longitude: 126.9797 }, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c' },
  { id: 'm160', name: 'Yongsan Central Hotel', cat: 'hotel', loc: 'Yongsan, Seoul', rating: 4.6, coords: { latitude: 37.5380, longitude: 126.9766 }, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427' },
  { id: 'm161', name: 'Yongsan Skyline Suites', cat: 'hotel', loc: 'Yongsan, Seoul', rating: 4.8, coords: { latitude: 37.5288, longitude: 126.9896 }, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843' },
  { id: 'm162', name: 'Yongsan Kitchen', cat: 'dining', loc: 'Yongsan, Seoul', rating: 4.8, coords: { latitude: 37.5267, longitude: 126.9725 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947' },
  { id: 'm163', name: 'Yongsan Table', cat: 'dining', loc: 'Yongsan, Seoul', rating: 4.5, coords: { latitude: 37.5407, longitude: 126.9845 }, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
  { id: 'm164', name: 'Yongsan Grill House', cat: 'dining', loc: 'Yongsan, Seoul', rating: 4.7, coords: { latitude: 37.5212, longitude: 126.9851 }, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e' },
  { id: 'm165', name: 'Yongsan Concept Store', cat: 'shopping', loc: 'Yongsan, Seoul', rating: 4.6, coords: { latitude: 37.5359, longitude: 126.9708 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm166', name: 'Yongsan Fashion House', cat: 'shopping', loc: 'Yongsan, Seoul', rating: 4.8, coords: { latitude: 37.5346, longitude: 126.9923 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm167', name: 'Yongsan Boutique', cat: 'shopping', loc: 'Yongsan, Seoul', rating: 4.5, coords: { latitude: 37.5204, longitude: 126.9748 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm168', name: 'Yongsan Flagship Store', cat: 'shopping', loc: 'Yongsan, Seoul', rating: 4.7, coords: { latitude: 37.5436, longitude: 126.9782 }, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc' },
  { id: 'm169', name: 'Yongsan Style Lab', cat: 'shopping', loc: 'Yongsan, Seoul', rating: 4.9, coords: { latitude: 37.5235, longitude: 126.9919 }, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5' },
  { id: 'm170', name: 'Yongsan Design Shop', cat: 'shopping', loc: 'Yongsan, Seoul', rating: 4.6, coords: { latitude: 37.5293, longitude: 126.9674 }, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
  { id: 'm171', name: 'Yongsan Atelier', cat: 'shopping', loc: 'Yongsan, Seoul', rating: 4.8, coords: { latitude: 37.5419, longitude: 126.9901 }, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b' },
  { id: 'm172', name: 'Yongsan Performance Hall', cat: 'show', loc: 'Yongsan, Seoul', rating: 4.8, coords: { latitude: 37.5165, longitude: 126.9816 }, image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34' },
  { id: 'm173', name: 'Yongsan Live Theater', cat: 'show', loc: 'Yongsan, Seoul', rating: 4.5, coords: { latitude: 37.5417, longitude: 126.9704 }, image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3' },
  { id: 'm174', name: 'Yongsan K-Show Stage', cat: 'show', loc: 'Yongsan, Seoul', rating: 4.7, coords: { latitude: 37.5304, longitude: 126.9964 }, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
  { id: 'm175', name: 'Yongsan Concert Hall', cat: 'show', loc: 'Yongsan, Seoul', rating: 4.9, coords: { latitude: 37.5210, longitude: 126.9689 }, image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b' },
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
