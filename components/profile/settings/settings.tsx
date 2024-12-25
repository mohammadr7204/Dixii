import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import styles from "./settings.style";
import { icons, images } from "../../../constants";
import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import { useRouter } from "expo-router";
import { signOut } from "aws-amplify/auth";

const Settings = () => {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("login");
  }

  return (
    <View>
      <TouchableOpacity style={styles.editProfileButton} onPress={() => router.push("editProfile")}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={()=> router.push("settings")}>
          <Image
            source={icons.setting}
            resizeMode="contain"
            style={styles.icon}
          />
          <Text style={styles.iconText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          // onPress={() => router.push("badges")}
        >
          <Image
            source={icons.medal}
            resizeMode="contain"
            style={styles.icon}
          />
          <Text style={styles.iconText}>Badges</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          // onPress={() => router.push("earbudDiagnostics")}
        >
          <Image
            source={icons.sound}
            resizeMode="contain"
            style={styles.icon}
          />
          <Text style={styles.iconText}>Headphones</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Settings;
