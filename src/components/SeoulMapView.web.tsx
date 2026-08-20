import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { colors, categoryAccents, categoryEmoji } from '../theme/theme';
import { YOU_COORDS, merchantBestCoinPct } from '../data/merchants';
import type { Merchant } from '../data/merchants';
import type { SeoulMapViewProps } from './SeoulMapView.types';

const LEAFLET_CSS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';

function useLeafletCss() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById('leaflet-css')) return;
    const link = document.createElement('link');
    link.id = 'leaflet-css';
    link.rel = 'stylesheet';
    link.href = LEAFLET_CSS_URL;
    document.head.appendChild(link);
  }, []);
}

// A circular pin with the category emoji front-and-center and a small
// percent-off badge in the corner, rendered as plain HTML via Leaflet's
// divIcon — this sidesteps Leaflet's classic bundler pain point of broken
// default marker image paths, since we never use L.Icon/L.Marker's default
// image icon. Kept deliberately label-free so ~50 dense pins don't turn into
// an overlapping wall of name tags — tap a pin to see who it is.
function pinDivIcon(color: string, emoji: string, pct?: number) {
  const html = `
    <div style="position:relative;width:38px;height:38px;">
      <div style="width:36px;height:36px;border-radius:50% 50% 50% 4px;background:${color};
        transform:rotate(45deg);display:flex;align-items:center;justify-content:center;
        border:2px solid #fff;box-shadow:0 4px 10px rgba(0,0,0,0.32);">
        <span style="transform:rotate(-45deg);font-size:16px;line-height:1;">${emoji}</span>
      </div>
      ${
        pct !== undefined
          ? `<div style="position:absolute;top:-4px;right:-6px;background:${colors.ink};color:#fff;
              padding:1px 4px;border-radius:8px;font-size:8.5px;font-weight:700;font-family:sans-serif;
              border:1.5px solid #fff;white-space:nowrap;">-${pct}%</div>`
          : ''
      }
    </div>
  `;
  return L.divIcon({ html, className: 'zekto-pin', iconSize: [38, 38], iconAnchor: [19, 34] });
}

function MapController({ focusRegion }: { focusRegion: SeoulMapViewProps['focusRegion'] }) {
  const map = useMap();
  useEffect(() => {
    if (focusRegion) {
      map.flyTo([focusRegion.latitude, focusRegion.longitude], 14, { duration: 1.1 });
    }
  }, [focusRegion, map]);
  return null;
}

function MerchantMarker({ merchant, onPress }: { merchant: Merchant; onPress: () => void }) {
  const color = categoryAccents[merchant.cat];
  const pct = merchantBestCoinPct(merchant.id);
  const icon = useMemo(
    () => pinDivIcon(color, categoryEmoji[merchant.cat], pct),
    [color, pct, merchant.cat]
  );
  const position: [number, number] = [merchant.coords.latitude, merchant.coords.longitude];
  return <Marker position={position} icon={icon} eventHandlers={{ click: onPress }} />;
}

export default function SeoulMapView({ merchants, onPressMerchant, focusRegion }: SeoulMapViewProps) {
  useLeafletCss();
  const youIcon = useMemo(() => pinDivIcon(colors.ink, '🧭'), []);

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapContainer
        center={[YOU_COORDS.latitude, YOU_COORDS.longitude]}
        zoom={12}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController focusRegion={focusRegion} />
        <Marker position={[YOU_COORDS.latitude, YOU_COORDS.longitude]} icon={youIcon} />
        {merchants.map((m) => (
          <MerchantMarker key={m.id} merchant={m} onPress={() => onPressMerchant(m.id)} />
        ))}
      </MapContainer>
    </View>
  );
}
