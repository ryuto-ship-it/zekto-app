import { Coords, MAP_BOUNDS } from '../data/merchants';

const PADDING_PCT = 10;

// Simple equirectangular projection of a lat/lng into a percentage position
// inside MAP_BOUNDS, for the web fallback map (react-native-maps has no web
// support, so the web build renders pins on a static illustrated map instead).
export function projectToPercent(coords: Coords): { leftPct: number; topPct: number } {
  const { minLat, maxLat, minLng, maxLng } = MAP_BOUNDS;
  const xRatio = (coords.longitude - minLng) / (maxLng - minLng);
  const yRatio = (maxLat - coords.latitude) / (maxLat - minLat);
  const span = 100 - PADDING_PCT * 2;
  return {
    leftPct: PADDING_PCT + xRatio * span,
    topPct: PADDING_PCT + yRatio * span,
  };
}
