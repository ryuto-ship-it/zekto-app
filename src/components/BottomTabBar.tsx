import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme/theme';
import { DiscoverIcon, WalletIcon, MapIcon, ProfileIcon } from './Icons';

const ICONS: Record<string, (props: { size?: number; color?: string }) => React.ReactElement> = {
  Discover: DiscoverIcon,
  Wallet: WalletIcon,
  Map: MapIcon,
  Profile: ProfileIcon,
};

export default function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { height: 64 + insets.bottom, paddingBottom: Math.max(insets.bottom, 10) }]}>
      <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = (options.tabBarLabel as string) ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const Icon = ICONS[route.name] ?? DiscoverIcon;
        const color = isFocused ? colors.jadeDeep : '#8B978F';

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.btn}>
            <Icon size={22} color={color} />
            <Text style={[styles.label, { color }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: Platform.OS === 'android' ? 'rgba(248,249,243,0.96)' : 'transparent',
    overflow: 'hidden',
  },
  btn: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  label: { fontSize: 10, fontFamily: fonts.sansBold },
});
