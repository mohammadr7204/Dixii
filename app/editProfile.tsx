import React, { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES, icons, images } from "../constants";
import GlobalStyles from "../components/globalStyle";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import styles from "../components/editProfile/editProfile.styles";
import EditProfileForm from "../components/editProfile/editProfileForm";
import EditPicture from "../components/editProfile/editPicture";

const EditProfile = () => {
  const router = useRouter();
  const client = generateClient<Schema>();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Stack.Screen
          options={{
            headerShown: false, // Hide the default header
            autoHideHomeIndicator: true,
          }}
        />
        <ScrollView
          style={{ paddingHorizontal: 16, paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.arrow}
                source={icons.leftArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.text}>Edit Profile</Text>
          </View>
          <EditPicture />
          <EditProfileForm />
          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default EditProfile;
