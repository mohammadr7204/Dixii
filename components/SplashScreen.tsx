// components/SplashScreen.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { Stack, useRouter } from "expo-router";
import { getCurrentUser } from "aws-amplify/auth";

const SplashScreen = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const { username } = await getCurrentUser();
        setLoggedIn(true);
      } catch (error) {
        setLoggedIn(false);
      }
    }

    checkLoginStatus();
  }, []);

  const handleAnimationFinish = () => {
    if (loggedIn) {
      router.push("home");
    } else {
      router.push("login");
    }
    setTimeout(() => { }, 0); // Short delay to ensure smooth transition
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ headerShown: false, autoHideHomeIndicator: true }}
      />
      <LottieView
        source={require("../assets/animations/splash.json")}
        autoPlay
        loop={false}
        speed={1}
        onAnimationFinish={handleAnimationFinish}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  animation: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default SplashScreen;
