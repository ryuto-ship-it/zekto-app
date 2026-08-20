import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function PulsingDot({ color = '#E2453F', size = 7 }: { color?: string; size?: number }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.dot,
        { backgroundColor: color, width: size, height: size, borderRadius: size / 2, opacity },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {},
});
