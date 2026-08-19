import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/theme';
import TopBar from '../components/TopBar';
import TabNavigator from './TabNavigator';

export default function TabsScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <TopBar />
      <View style={styles.body}>
        <TabNavigator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  body: { flex: 1 },
});
