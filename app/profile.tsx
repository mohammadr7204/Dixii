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
import { Stack } from 'expo-router';
import Header from '../components/profile/header/header'
import Navbar from '../components/common/navbar/navbar';
import Settings from "../components/profile/settings/settings";

const Profile = () => {
  const router = useRouter();
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
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 16, paddingVertical: 0}}>
            <View>
                <Header />
                <Settings /> 
            </View>
            </ScrollView>
            </SafeAreaView>
            <Navbar analytics={true} home={true} profile={false} />
            </View>
    )
}
export default Profile