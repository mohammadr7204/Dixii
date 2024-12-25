import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, icons, images } from "../constants";
import { registerRootComponent } from "expo";
import { Redirect, useRouter } from "expo-router";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import GlobalStyles from "../components/globalStyle";
import { Stack } from "expo-router";
import Header from "../components/settings/header/header";
import BackArrow from "../components/backArrow/backArrow";
import Modal from "react-native-modal";
import Update from "../components/settings/update/update";

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // Callback function to toggle modal visibility
  const toggleModal = (isVisible) => {
    setModalVisible(isVisible);
  };

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
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 16 }}>
          <BackArrow text="Settings" />
          <Header toggleModal={toggleModal} />
        </ScrollView>
      </SafeAreaView>
      <Modal isVisible={modalVisible}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}
        >
          <TouchableOpacity activeOpacity={1}>
            <Update />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Settings;    