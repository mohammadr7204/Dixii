import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { COLORS, SIZES, FONT, images, icons } from "../../../constants";
import styles from "./batteryLife.styles"

const BatteryIcon = ({ percentage }) => {
  const batteryLevel = Math.max(0, Math.min(100, percentage)); // Ensure percentage is between 0 and 100
  const batteryHeight = 25;
  const batteryWidth = 50;
  const terminalWidth = 5;
  const batteryFillWidth = (batteryWidth - 4) * (batteryLevel / 100);
  const borderWidth = 3;

  return (
    <View style={styles.batteryContainer}>
      <Svg height={batteryHeight} width={batteryWidth + terminalWidth}>
        <Rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={batteryWidth - borderWidth}
          height={batteryHeight - borderWidth}
          fill={COLORS.gray4}
          stroke={COLORS.gray4}
          strokeWidth={borderWidth}
          rx="3"
        />
        <Rect
          x={borderWidth}
          y={borderWidth}
          width={batteryFillWidth}
          height={batteryHeight - borderWidth * 2}
          fill={batteryLevel > 20 ? COLORS.green : COLORS.red}
          rx="3"
        />
        <Rect
          x={batteryWidth - borderWidth / 2}
          y={batteryHeight / 4}
          width={terminalWidth}
          height={batteryHeight / 2}
          fill={COLORS.gray4}
          rx="2"
        />
      </Svg>
      <Text style={styles.batteryText}>
        {batteryLevel}
      </Text>
    </View>
  );
};

export default BatteryIcon;
