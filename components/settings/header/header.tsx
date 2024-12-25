import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from "../../../constants";
import { images } from "../../../constants";
import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacityComponent,
} from "react-native";
import { Stack, useRouter, Link } from "expo-router";

import styles from "./header.style";

const Header = ({ toggleModal }) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const handleButtonPress = () => {
    toggleModal(true); // Set modal visibility to true
  };
  return (
    <View style={styles.listContainer}>
      <Text style={styles.mainText}>User Profile</Text>
      <View style={{ marginTop: 5 }}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push("editProfile")}
        >
          <Image source={icons.user} resizeMode="contain" style={styles.logo} />
          <Text style={styles.subText}>Update User Information</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push("settingsPages/password")}
        >
          <Image source={icons.lock} resizeMode="contain" style={styles.logo} />
          <Text style={styles.subText}>Password and Security</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push("settingsPages/notification")}
        >
          <Image source={icons.noti} resizeMode="contain" style={styles.logo} />
          <Text style={styles.subText}>Notifications</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleButtonPress()}
        >
          <Image
            source={icons.language}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.subText}>Language & Region</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push("settingsPages/subscription")}
        >
          <Image
            source={icons.billing}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.subText}>Subscription & Billing</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
      {/* <Text style={{ ...styles.mainText, marginTop: 10 }}>
        Device Management
      </Text> */}
      <View style={{ marginTop: 5 }}>
        {/* <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push("settingsPages/connectedDevices")}
        >
          <Image
            source={icons.bluetooth}
            resizeMode="contain"
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
              marginTop: 7,
            }}
          />
          <Text style={styles.subText}>Connected Devices</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push("settingsPages/deviceSettings")}
        >
          <Image
            source={icons.setting}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.subText}>Device Settings</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity> */}

        <Text style={{ ...styles.mainText, marginTop: 10 }}>
          Application Settings
        </Text>
        <View style={{ marginTop: 5 }}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleButtonPress()}
          >
            <Image
              source={icons.paintbrush}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text style={styles.subText}>Theme & Appearance</Text>
            <Image
              source={icons.rightArrow}
              resizeMode="contain"
              style={styles.arrow}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => router.push("settingsPages/appVersion")}
          >
            <Image
              source={icons.update}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text style={styles.subText}>App Version & Updates</Text>
            <Image
              source={icons.rightArrow}
              resizeMode="contain"
              style={styles.arrow}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => router.push("settingsPages/help")}
          >
            <Image
              source={icons.question}
              resizeMode="contain"
              style={{
                height: 18,
                width: 18,
                tintColor: COLORS.white,
                marginTop: 6,
              }}
            />
            <Text style={styles.subText}>Help & Support</Text>
            <Image
              source={icons.rightArrow}
              resizeMode="contain"
              style={styles.arrow}
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.itemContainer}>
            <Image
              source={icons.note}
              resizeMode="contain"
              style={{
                height: 15,
                width: 15,
                tintColor: COLORS.white,
                marginTop: 7,
              }}
            />
            <Text style={styles.subText}>About</Text>
            <Image
              source={icons.rightArrow}
              resizeMode="contain"
              style={styles.arrow}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      {/* <Text style={{ ...styles.mainText, marginTop: 10 }}>
        Connectivity Settings
      </Text> */}
      {/* <View style={{ marginTop: 5 }}>
        <TouchableOpacity style={styles.itemContainer}>
          <Image
            source={icons.bluetooth}
            resizeMode="contain"
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
              marginTop: 7,
            }}
          />
          <Text style={styles.subText}>Bluetooth</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <Image
            source={icons.wifi}
            resizeMode="contain"
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
              marginTop: 7,
            }}
          />
          <Text style={styles.subText}>Wi-Fi</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <Image
            source={icons.plane}
            resizeMode="contain"
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
              marginTop: 7,
            }}
          />
          <Text style={styles.subText}>Offline Mode</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View> */}
      <Text style={{ ...styles.mainText, marginTop: 10 }}>
        Legal and Compliance
      </Text>
      <View style={{ marginTop: 5 }}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push("termsConditions")}
        >
          <Image
            source={icons.note}
            resizeMode="contain"
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
              marginTop: 7,
            }}
          />
          <Text style={styles.subText}>Terms & Conditions</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push("termsConditions")}
        >
          <Image source={icons.lock} resizeMode="contain" style={styles.logo} />
          <Text style={styles.subText}>Privacy Policy</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push("termsConditions")}
        >
          <Image
            source={icons.setting}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.subText}>Compliance Settings</Text>
          <Image
            source={icons.rightArrow}
            resizeMode="contain"
            style={styles.arrow}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
export default Header;
