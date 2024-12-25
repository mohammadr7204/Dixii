import React from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { COLORS, SIZES, icons, images } from "../../constants";
import { registerRootComponent } from "expo";
import { Redirect, useRouter } from "expo-router";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import GlobalStyles from "../../components/globalStyle";
import { Stack } from "expo-router";
import Pass from "../../components/settingsList/pass/pass";
import ResetPass from "../../components/settingsList/pass/resetPass";

import BackArrow from "../../components/backArrow/backArrow";

const ChangePass = () => {
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ padding: 16 }}
                >
                    <BackArrow text="Change Password" />
                    <ResetPass /> 

                </ScrollView>
            </SafeAreaView>

        </View>
    )
}
export default ChangePass;
