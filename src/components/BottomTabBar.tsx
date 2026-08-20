import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme/theme';
import { DiscoverIcon, WalletIcon, MapIcon, ProfileIcon } from './Icons';
import { useApp } from '../context/AppContext';

const ICONS: Record<string, (props: { size?: number; color?: string }) => React.ReactElement> = {
  Discover: DiscoverIcon,
  Wallet: WalletIcon,
  Map: MapIcon,
  Profile: ProfileIcon,
};

export default function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { totalUnreadMessages } = useApp();

  return (
    <View style={[styles.wrap, { height: 64 + insets.bottom, paddingBottom: Math.max(insets.bottom, 10) }]}>
      <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = (options.tabBarLabel as string) ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const Icon = ICONS[route.name] ?? DiscoverIcon;
        const color = isFocused ? colors.primary : '#8B978F';

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const showBadge = route.name === 'Wallet' && totalUnreadMessages > 0;

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.btn}>
            <View>
              <Icon size={22} color={color} />
              {showBadge ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalUnreadMessages}</Text>
                </View>
              ) : null}
            </View>
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
  badge: {
    position: 'absolute', top: -4, right: -8, minWidth: 15, height: 15, borderRadius: 7.5,
    backgroundColor: colors.coral, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3,
    borderWidth: 1.5, borderColor: colors.white,
  },
  badgeText: { color: colors.white, fontSize: 8.5, fontFamily: fonts.sansBold },
});
