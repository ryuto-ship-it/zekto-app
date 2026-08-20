import { Coords } from './merchants';

export type Region = {
  id: string;
  name: string;
  blurb: string;
  coords: Coords;
};

export const REGIONS: Region[] = [
  { id: 'myeongdong', name: 'Myeongdong', blurb: 'Shopping · Street food', coords: { latitude: 37.5636, longitude: 126.9850 } },
  { id: 'seongsu', name: 'Seongsu', blurb: 'Cafés · Concept stores', coords: { latitude: 37.5445, longitude: 127.0557 } },
  { id: 'hongdae', name: 'Hongdae', blurb: 'Nightlife · Streetwear', coords: { latitude: 37.5563, longitude: 126.9220 } },
  { id: 'gangnam', name: 'Gangnam', blurb: 'Dermatology · Plastic surgery', coords: { latitude: 37.4979, longitude: 127.0276 } },
  { id: 'apgujeong', name: 'Apgujeong', blurb: 'Beauty clinics · Galleries', coords: { latitude: 37.5274, longitude: 127.0286 } },
  { id: 'cheongdam', name: 'Cheongdam', blurb: 'Luxury boutiques · Fine dining', coords: { latitude: 37.5172, longitude: 127.0473 } },
  { id: 'yongsan', name: 'Yongsan', blurb: 'Hotels · Han River views', coords: { latitude: 37.5311, longitude: 126.9810 } },
];

// Simple degree-distance (good enough at this scale, no need for true haversine).
export function degreeDistance(a: Coords, b: Coords): number {
  const dLat = a.latitude - b.latitude;
  const dLng = a.longitude - b.longitude;
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

// ~0.02deg is roughly a 2km radius at Seoul's latitude.
export const REGION_RADIUS_DEG = 0.02;
