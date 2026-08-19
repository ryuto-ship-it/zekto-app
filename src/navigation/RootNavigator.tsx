import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsScreen from './TabsScreen';
import ProductDetailSheet from '../screens/sheets/ProductDetailSheet';
import PurchaseSheet from '../screens/sheets/PurchaseSheet';
import QRSheet from '../screens/sheets/QRSheet';
import MerchantSheet from '../screens/sheets/MerchantSheet';
import WalletConnectSheet from '../screens/sheets/WalletConnectSheet';
import ResellSheet from '../screens/sheets/ResellSheet';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="Tabs" component={TabsScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }}>
          <Stack.Screen name="ProductDetail" component={ProductDetailSheet} />
          <Stack.Screen name="Purchase" component={PurchaseSheet} />
          <Stack.Screen name="QRCode" component={QRSheet} />
          <Stack.Screen name="Merchant" component={MerchantSheet} />
          <Stack.Screen name="WalletConnect" component={WalletConnectSheet} />
          <Stack.Screen name="Resell" component={ResellSheet} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
