import { Merchant } from '../data/merchants';

export type SeoulMapViewProps = {
  merchants: Merchant[];
  onPressMerchant: (id: string) => void;
  // Native only — ignored by the web fallback map. Pass a react-native-maps
  // Region-shaped object to animate the camera (e.g. when a neighborhood tab
  // is selected). Typed loosely here so this file stays maps-library-free.
  focusRegion?: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number } | null;
};
