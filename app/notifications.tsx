// app/notifications.tsx
import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, StatusBar, Text } from 'react-native';
import { COLORS, SIZES, FONT } from '../constants';
import { Stack } from 'expo-router';
import GlobalStyles from '../components/globalStyle';
import BackArrow from '../components/backArrow/backArrow';
import Navbar from '../components/common/navbar/navbar';
import XpEarned from '../components/notifications/xpEarned/xpEarned';
import CompletedDeepwork from '../components/notifications/completedDeepwork/completedDeepwork';
import Stressed from '../components/notifications/stressed/stressed';

const Notifications = () => {
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
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 16 }}>
          <View>
            <BackArrow text="Notification" />
            <XpEarned xp={20} timeAgo="10m ago" />
            <XpEarned xp={20} timeAgo="19m ago" />
            <Text style={styles.heading}>Today's Deepwork Session</Text>
            <CompletedDeepwork xp={420} timeAgo="8m ago" />
            <Stressed xp={40} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Navbar analytics={true} home={true} profile={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    marginVertical: 20,
  },
});

export default Notifications;
