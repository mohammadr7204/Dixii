import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import styles from "./navbar.style";
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from "../../../constants";
import { useRouter } from 'expo-router';
const Navbar = ({ analytics, home, profile }) => {
  const router = useRouter();
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.secondaryContainer}>
        <Pressable style={styles.iconContainer} onPress={() => analytics && router.push('analytics')}>
            <Image
              source={icons.analytics}
              resizeMode="contain"
              style={[styles.icon, { tintColor: analytics ? COLORS.gray2 : COLORS.white }]}
            />
            <Text style={[styles.iconText, { color: analytics ? COLORS.gray2 : COLORS.white }]}>Analytics</Text>
          </Pressable>
          <Pressable style={styles.iconContainer} onPress={() => home && router.push("home")}>
            <Image
              source={icons.eeg}
              resizeMode="contain"
              style={styles.eegLogo}
            />
          </Pressable>
          <Pressable style={styles.iconContainer} onPress={() => profile && router.push("profile")}>
            <Image
              source={icons.user}
              resizeMode="contain"
              style={[styles.icon, { tintColor: profile ? COLORS.gray2 : COLORS.white }]}
            />
            <Text style={[styles.iconText, { color: profile ? COLORS.gray2 : COLORS.white }]}>Profile</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default Navbar;
