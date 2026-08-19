import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '../theme/theme';

export default function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipActive: { backgroundColor: colors.jade, borderColor: colors.jade },
  text: { fontSize: 12.5, fontFamily: fonts.sansBold, color: colors.ink },
  textActive: { color: colors.white },
});
