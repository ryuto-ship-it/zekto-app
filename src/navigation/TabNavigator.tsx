import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverScreen from '../screens/DiscoverScreen';
import WalletScreen from '../screens/WalletScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTabBar from '../components/BottomTabBar';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, animation: 'shift' }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
