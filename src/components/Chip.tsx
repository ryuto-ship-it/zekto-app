import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii, shadows } from '../theme/theme';

export default function Chip({
  label,
  icon,
  active,
  activeColor = colors.jade,
  onPress,
}: {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  activeColor?: string;
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

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        style={[
          styles.chip,
          active ? { backgroundColor: activeColor, ...shadows.floating } : styles.chipInactive,
        ]}
        onPress={onPress}
      >
        {icon}
        <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
      </Pressable>
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
  chipInactive: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  text: { fontSize: 12.5, fontFamily: fonts.sansBold, color: colors.ink },
  textActive: { color: colors.white },
});
