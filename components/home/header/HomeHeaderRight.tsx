import { Image, TouchableOpacity, View } from "react-native";
import styles from "./header.style";
import React from "react";
import { icons } from "../../../constants";
import { useRouter } from "expo-router";

//RightSide Header
interface HomeHeaderRightProps {
  isChecked: boolean;
}

const HomeHeaderRight: React.FC<HomeHeaderRightProps> = ({ isChecked }) => {
  const router = useRouter();
  return (
    <View style={styles.iconContainer}>
      {/* <Image
        source={icons.music}
        resizeMode='contain'
        style={styles.noti}
      /> */}
      <TouchableOpacity onPress={() => router.push({
            pathname: '/todo',
            params: { someParam: 0}
          })}>
        <Image
          source={icons.task}
          resizeMode='contain'
          style={styles.noti}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => router.push("notifications")}>
        <Image
          source={icons.bell}
          resizeMode='contain'
          style={styles.noti}
        />
      </TouchableOpacity> */}
    </View>
  );
}
export default HomeHeaderRight;
