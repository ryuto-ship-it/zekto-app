import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { colors, fonts, categoryAccents } from '../theme/theme';
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
      <Marker coordinate={YOU_COORDS} anchor={{ x: 0.5, y: 1 }}>
        <View style={[styles.pinDot, styles.pinDotYou]}>
          <Text style={styles.pinDotText}>YOU</Text>
        </View>
      </Marker>
      {merchants.map((m) => (
        <Marker
          key={m.id}
          coordinate={m.coords}
          anchor={{ x: 0.5, y: 1 }}
          onPress={() => onPressMerchant(m.id)}
        >
          <View style={styles.pin}>
            <View style={[styles.pinDot, { backgroundColor: categoryAccents[m.cat] }]}>
              <Text style={styles.pinDotText}>-{merchantBestCoinPct(m.id)}%</Text>
            </View>
            <View style={styles.pinLabel}>
              <Text style={styles.pinLabelText}>✓ {m.name.split(' ')[0]}</Text>
            </View>
          </View>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  pin: { alignItems: 'center' },
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
