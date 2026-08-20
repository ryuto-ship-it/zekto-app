import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { colors, categoryAccents } from '../theme/theme';
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

// A diamond pin (matching the app's category accent colors) with an optional
// name label underneath, rendered as plain HTML via Leaflet's divIcon — this
// sidesteps Leaflet's classic bundler pain point of broken default marker
// image paths, since we never use L.Icon/L.Marker's default image icon.
function pinDivIcon(color: string, pinText: string, nameLabel?: string) {
  const html = `
    <div style="display:flex;flex-direction:column;align-items:center;font-family:sans-serif;width:110px;">
      <div style="width:32px;height:32px;border-radius:16px 16px 16px 0;background:${color};
        transform:rotate(45deg);display:flex;align-items:center;justify-content:center;
        border:2px solid rgba(255,255,255,0.7);box-shadow:0 4px 8px rgba(0,0,0,0.28);flex-shrink:0;">
        <span style="transform:rotate(-45deg);color:#fff;font-size:9px;font-weight:700;">${pinText}</span>
      </div>
      ${
        nameLabel
          ? `<div style="margin-top:4px;background:#fff;padding:2px 6px;border-radius:6px;font-size:9.5px;
              font-weight:700;color:#16211F;white-space:nowrap;box-shadow:0 2px 4px rgba(0,0,0,0.18);">${nameLabel}</div>`
          : ''
      }
    </div>
  `;
  return L.divIcon({ html, className: 'zekto-pin', iconSize: [110, 54], iconAnchor: [55, 32] });
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
    () => pinDivIcon(color, `-${pct}%`, `✓ ${merchant.name.split(' ')[0]}`),
    [color, pct, merchant.name]
  );
  const position: [number, number] = [merchant.coords.latitude, merchant.coords.longitude];
  return <Marker position={position} icon={icon} eventHandlers={{ click: onPress }} />;
}

export default function SeoulMapView({ merchants, onPressMerchant, focusRegion }: SeoulMapViewProps) {
  useLeafletCss();
  const youIcon = useMemo(() => pinDivIcon(colors.ink, 'YOU'), []);

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
