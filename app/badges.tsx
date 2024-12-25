import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { COLORS, SIZES, icons, images } from "../constants";
import { registerRootComponent } from "expo";
import { Redirect, useRouter } from "expo-router";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import GlobalStyles from "../components/globalStyle";
import { Stack } from "expo-router";
import BackArrow from "../components/backArrow/backArrow";
import BadgeList from "../components/badges/badgeList/badgeList";

const Badges = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Stack.Screen
          options={{
            headerShown: false, // Hide the default header
            autoHideHomeIndicator: true,
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 16 }}
        >
          <View>
            <BackArrow text="Badges" />
            <BadgeList />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default Badges;
