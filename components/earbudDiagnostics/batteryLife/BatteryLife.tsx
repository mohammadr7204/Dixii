import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./batteryLife.styles";
import { COLORS, SIZES, FONT, images, icons } from "../../../constants";
import BatteryIcon from "./BatteryIcon";

const BatteryLife = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Battery Life</Text>
      <Image source={icons.earbudCase} style={styles.image} />
      <View style={styles.batteryContainer}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <BatteryIcon percentage={19} />
        </View>
      </View>
      <View style={styles.earbudsContainer}>
        <View style={styles.earbud}>
          <Image source={icons.earbudLeft} style={styles.earbudImage} />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <BatteryIcon percentage={51} />
          </View>
        </View>
        <View style={styles.earbud}>
          <Image source={icons.earbudRight} style={styles.earbudImage} />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <BatteryIcon percentage={73} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default BatteryLife;
