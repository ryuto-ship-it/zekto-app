import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { colors, fonts, categoryAccents, categoryEmoji } from '../theme/theme';
import { MAP_BOUNDS, YOU_COORDS, merchantBestCoinPct } from '../data/merchants';
import { SeoulMapViewProps } from './SeoulMapView.types';

const INITIAL_REGION: Region = {
  latitude: (MAP_BOUNDS.minLat + MAP_BOUNDS.maxLat) / 2,
  longitude: (MAP_BOUNDS.minLng + MAP_BOUNDS.maxLng) / 2,
  latitudeDelta: (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat) * 1.15,
  longitudeDelta: (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng) * 1.15,
};

export default function SeoulMapView({ merchants, onPressMerchant, focusRegion }: SeoulMapViewProps) {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (focusRegion) {
      mapRef.current?.animateToRegion(focusRegion, 600);
    }
  }, [focusRegion]);

  return (
    <MapView ref={mapRef} style={StyleSheet.absoluteFill} initialRegion={INITIAL_REGION}>
      <Marker coordinate={YOU_COORDS} anchor={{ x: 0.5, y: 0.5 }}>
        <View style={[styles.pinDot, styles.pinDotYou]}>
          <Text style={styles.pinEmoji}>🧭</Text>
        </View>
      </Marker>
      {merchants.map((m) => (
        <Marker
          key={m.id}
          coordinate={m.coords}
          anchor={{ x: 0.5, y: 0.5 }}
          onPress={() => onPressMerchant(m.id)}
        >
          <View style={styles.pin}>
            <View style={[styles.pinDot, { backgroundColor: categoryAccents[m.cat] }]}>
              <Text style={styles.pinEmoji}>{categoryEmoji[m.cat]}</Text>
            </View>
            <View style={styles.pctBadge}>
              <Text style={styles.pctBadgeText}>-{merchantBestCoinPct(m.id)}%</Text>
            </View>
          </View>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  pin: { alignItems: 'center', justifyContent: 'center', width: 38, height: 38 },
  pinDot: {
    width: 34, height: 34, borderRadius: 17, borderBottomLeftRadius: 4,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.white,
    shadowColor: colors.ink, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5,
  },
  pinDotYou: { backgroundColor: colors.ink },
  pinEmoji: { fontSize: 16, lineHeight: 18 },
  pctBadge: {
    position: 'absolute', top: -4, right: -6, backgroundColor: colors.ink, borderRadius: 8,
    paddingVertical: 1, paddingHorizontal: 4, borderWidth: 1.5, borderColor: colors.white,
  },
  pctBadgeText: { color: colors.white, fontSize: 8.5, fontFamily: fonts.sansBold },
});
