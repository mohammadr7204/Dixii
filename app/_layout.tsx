import { Stack } from 'expo-router'
import { useFonts } from "expo-font";
import React from 'react';

const Layout = () => {
    const [fontsLoaded] = useFonts({
        PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
        PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemi: require("../assets/fonts/Poppins-SemiBold.ttf"),
        PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack />
    )
};

export default Layout;
