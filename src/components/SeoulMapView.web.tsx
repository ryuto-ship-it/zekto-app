import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Line } from 'react-native-svg';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { colors, fonts, categoryAccents } from '../theme/theme';
import { Merchant, MAP_BOUNDS, YOU_COORDS, merchantBestCoinPct } from '../data/merchants';
import { projectToPercent } from '../utils/geo';
import type { SeoulMapViewProps } from './SeoulMapView.types';

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

// react-native-maps has no web renderer. On web we use the real Google Maps
// JavaScript API (via @react-google-maps/api) when a key is configured; with
// no key we fall back to a stylized illustrated stand-in map so the screen is
// never blank. Either way this is never a literal <MapView> import on web.
export default function SeoulMapView(props: SeoulMapViewProps) {
  if (!GOOGLE_MAPS_API_KEY) {
    return <IllustratedFallbackMap {...props} />;
  }
  return <LiveGoogleMap {...props} />;
}

const CITY_CENTER = {
  lat: (MAP_BOUNDS.minLat + MAP_BOUNDS.maxLat) / 2,
  lng: (MAP_BOUNDS.minLng + MAP_BOUNDS.maxLng) / 2,
};

const MAP_CONTAINER_STYLE = { width: '100%', height: '100%' };
const MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
  clickableIcons: false,
  styles: [
    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  ],
};

function LiveGoogleMap({ merchants, onPressMerchant, focusRegion }: SeoulMapViewProps) {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAPS_API_KEY as string });
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !focusRegion) return;
    mapRef.current.panTo({ lat: focusRegion.latitude, lng: focusRegion.longitude });
    mapRef.current.setZoom(14);
  }, [focusRegion]);

  if (!isLoaded) {
    return <IllustratedFallbackMap merchants={merchants} onPressMerchant={onPressMerchant} focusRegion={focusRegion} />;
  }

  return (
    <GoogleMap
      mapContainerStyle={MAP_CONTAINER_STYLE}
      center={CITY_CENTER}
      zoom={12}
      options={MAP_OPTIONS}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      <OverlayView position={{ lat: YOU_COORDS.latitude, lng: YOU_COORDS.longitude }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
        <View style={styles.pinOverlay}>
          <View style={[styles.pinDot, styles.pinDotYou]}>
            <Text style={styles.pinDotText}>YOU</Text>
          </View>
        </View>
      </OverlayView>
      {merchants.map((m) => (
        <OverlayView key={m.id} position={{ lat: m.coords.latitude, lng: m.coords.longitude }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <GoogleMarkerPin merchant={m} onPress={() => onPressMerchant(m.id)} />
        </OverlayView>
      ))}
    </GoogleMap>
  );
}

function GoogleMarkerPin({ merchant, onPress }: { merchant: Merchant; onPress: () => void }) {
  const color = categoryAccents[merchant.cat];
  return (
    <Pressable style={styles.pinOverlay} onPress={onPress}>
      <View style={[styles.pinDot, { backgroundColor: color }]}>
        <Text style={styles.pinDotText}>-{merchantBestCoinPct(merchant.id)}%</Text>
      </View>
      <View style={styles.pinLabel}>
        <Text style={styles.pinLabelText}>✓ {merchant.name.split(' ')[0]}</Text>
      </View>
    </Pressable>
  );
}

function IllustratedFallbackMap({ merchants, onPressMerchant }: SeoulMapViewProps) {
  const you = projectToPercent(YOU_COORDS);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={[StyleSheet.absoluteFill]}>
        <Rect x={0} y={0} width={100} height={100} fill="#E7EEE2" />
        {BLOCKS.map((b, i) => (
          <Rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill="#DCE6D6" opacity={0.7} />
        ))}
        <Path
          d="M -5 62 C 20 58, 35 70, 55 64 C 75 58, 85 68, 105 60"
          stroke="#B9D9E0"
          strokeWidth={9}
          fill="none"
          opacity={0.75}
        />
        {ROAD_LINES.map((r, i) => (
          <Line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="#FFFFFF" strokeWidth={r.w} opacity={0.8} />
        ))}
      </Svg>

      <View style={[styles.pin, { left: `${you.leftPct}%`, top: `${you.topPct}%` }]}>
        <View style={[styles.pinDot, styles.pinDotYou]}>
          <Text style={styles.pinDotText}>YOU</Text>
        </View>
      </View>

      {merchants.map((m) => (
        <FallbackMapPin key={m.id} merchant={m} onPress={() => onPressMerchant(m.id)} />
      ))}
    </View>
  );
}

const BLOCKS = [
  { x: 6, y: 8, w: 22, h: 16 },
  { x: 34, y: 6, w: 18, h: 20 },
  { x: 60, y: 10, w: 24, h: 14 },
  { x: 8, y: 74, w: 20, h: 18 },
  { x: 40, y: 78, w: 22, h: 16 },
  { x: 70, y: 76, w: 22, h: 18 },
  { x: 58, y: 30, w: 16, h: 14 },
];

const ROAD_LINES = [
  { x1: 0, y1: 20, x2: 100, y2: 16, w: 0.6 },
  { x1: 0, y1: 42, x2: 100, y2: 46, w: 0.6 },
  { x1: 0, y1: 80, x2: 100, y2: 84, w: 0.6 },
  { x1: 18, y1: 0, x2: 14, y2: 100, w: 0.6 },
  { x1: 50, y1: 0, x2: 54, y2: 100, w: 0.6 },
  { x1: 78, y1: 0, x2: 82, y2: 100, w: 0.6 },
];

function FallbackMapPin({ merchant, onPress }: { merchant: Merchant; onPress: () => void }) {
  const pos = projectToPercent(merchant.coords);
  const scale = useRef(new Animated.Value(0.4)).current;
  const ringOpacity = useRef(new Animated.Value(0.55)).current;
  const color = categoryAccents[merchant.cat];

  useEffect(() => {
    const loop = Animated.loop(
      Animated.parallel([
        Animated.timing(scale, { toValue: 1.9, duration: 2200, useNativeDriver: true }),
        Animated.timing(ringOpacity, { toValue: 0, duration: 2200, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => {
      loop.stop();
      scale.setValue(0.4);
      ringOpacity.setValue(0.55);
    };
  }, [scale, ringOpacity]);

  return (
    <Pressable style={[styles.pin, { left: `${pos.leftPct}%`, top: `${pos.topPct}%` }]} onPress={onPress}>
      <Animated.View style={[styles.pulseRing, { backgroundColor: color, opacity: ringOpacity, transform: [{ scale }] }]} />
      <View style={[styles.pinDot, { backgroundColor: color }]}>
        <Text style={styles.pinDotText}>-{merchantBestCoinPct(merchant.id)}%</Text>
      </View>
      <View style={styles.pinLabel}>
        <Text style={styles.pinLabelText}>✓ {merchant.name.split(' ')[0]}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pin: { position: 'absolute', alignItems: 'center', transform: [{ translateX: -20 }, { translateY: -40 }] },
  pinOverlay: { alignItems: 'center', transform: [{ translateX: -20 }, { translateY: -40 }] },
  pulseRing: { position: 'absolute', bottom: 0, alignSelf: 'center', width: 30, height: 30, borderRadius: 15 },
  pinDot: {
    width: 32, height: 32, borderRadius: 16, borderBottomRightRadius: 0,
    backgroundColor: colors.jade, transform: [{ rotate: '45deg' }], alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)',
  },
  pinDotYou: { backgroundColor: colors.ink },
  pinDotText: { color: colors.white, fontSize: 9, fontFamily: fonts.sansBold, transform: [{ rotate: '-45deg' }] },
  pinLabel: { marginTop: 4, backgroundColor: colors.white, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 6 },
  pinLabelText: { fontSize: 9.5, fontFamily: fonts.sansBold, color: colors.ink },
});
