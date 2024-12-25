import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../constants';
import { Stack } from 'expo-router';
import GlobalStyles from '../components/globalStyle';
import BackArrow from '../components/backArrow/backArrow';
import Navbar from '../components/common/navbar/navbar';
import BatteryLife from '../components/earbudDiagnostics/batteryLife/BatteryLife';

const EarbudDiagnostics = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Stack.Screen
          options={{
            headerShown: false,
            autoHideHomeIndicator: true,
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
          <View>
            <BackArrow text="Earbud Diagnostics" />
            <BatteryLife />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Navbar analytics={true} home={true} profile={false} />
    </View>
  );
};

export default EarbudDiagnostics;
