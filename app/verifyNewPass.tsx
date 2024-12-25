import { View, Text, ScrollView, SafeAreaView, Image, StatusBar, Pressable } from "react-native";
import { useState } from 'react';
import { Stack, useRouter, Link } from 'expo-router';
import { COLORS, FONT, SIZES, SHADOWS, icons, images } from '../constants';
import Message from '../components/verifyNewPass/message/message';
import Form from '../components/verifyNewPass/form/form';
import GlobalStyles from '../components/globalStyle';
import React from "react";

const VerifyNewPass = () => {

    return (
        <View
            style={{ flex: 1, backgroundColor: COLORS.secondary }}>
            <StatusBar barStyle='light-content' />
            <SafeAreaView
                style={GlobalStyles.droidSafeArea}>
                <Stack.Screen
                    options={{ headerShown: false, autoHideHomeIndicator: true, }}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 24 }}>
                        <Message />
                        <Form />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
export default VerifyNewPass;