import React from 'react';
import { View, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FRAME_WIDTH = 430;
const FRAME_MAX_HEIGHT = 900;

// On web, wraps the app in a phone-shaped frame centered on a dark backdrop once the
// viewport is wider than a real phone — so the desktop preview reads as "a phone on a
// desk" instead of a stretched website. A real mobile browser (viewport <= 430px)
// renders the app edge-to-edge with no frame, since it already *is* a phone.
export default function WebPhoneFrame({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();

  if (Platform.OS !== 'web' || width <= FRAME_WIDTH) {
    return <View style={styles.fill}>{children}</View>;
  }

  const frameHeight = Math.min(height - 48, FRAME_MAX_HEIGHT);

  return (
    <LinearGradient colors={['#2A3B36', '#131B18', '#0D1210']} style={styles.backdrop}>
      <View style={[styles.frame, { height: frameHeight }]}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  backdrop: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  frame: {
    width: FRAME_WIDTH,
    maxWidth: '100%',
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 30,
  },
});
