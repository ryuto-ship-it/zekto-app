import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radii, shadows } from '../theme/theme';

export default function Chip({
  label,
  icon,
  active,
  activeColor = colors.primary,
  activeGradient,
  onPress,
}: {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  activeColor?: string;
  activeGradient?: [string, string];
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(active ? 1.05 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: active ? 1.05 : 1,
      useNativeDriver: true,
      speed: 26,
      bounciness: 8,
    }).start();
  }, [active, scale]);

  const content = (
    <>
      {icon}
      <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
    </>
  );

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      {active && activeGradient ? (
        <LinearGradient
          colors={activeGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.chip, shadows.floating]}
        >
          <Pressable style={styles.pressableFill} onPress={onPress}>
            {content}
          </Pressable>
        </LinearGradient>
      ) : (
        <Pressable
          style={[
            styles.chip,
            active ? { backgroundColor: activeColor, ...shadows.floating } : styles.chipInactive,
          ]}
          onPress={onPress}
        >
          {content}
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
  },
  pressableFill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  chipInactive: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  text: { fontSize: 12.5, fontFamily: fonts.sansBold, color: '#6B7280' },
  textActive: { color: colors.white },
});
