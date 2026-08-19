import React, { useRef } from 'react';
import { Animated, Pressable, ViewStyle, StyleProp } from 'react-native';

// Shared press feedback for cards across the app: a quick spring down to 0.97
// scale on press-in, springing back on release, instead of a hard flat tap.
export function AnimatedPressable({
  onPress,
  style,
  children,
}: {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={() => animateTo(0.97)}
        onPressOut={() => animateTo(1)}
        style={style}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
