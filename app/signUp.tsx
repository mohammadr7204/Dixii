import { View, Text, ScrollView, SafeAreaView, Image, StatusBar, Pressable } from "react-native";
import { useState } from 'react';
import { Stack, useRouter, Link } from 'expo-router';
import { COLORS, FONT, SIZES, SHADOWS, icons, images } from '../constants';
import Logo from '../components/common/logo/logo';
import Message from '../components/signUp/message/message';
import Form from '../components/signUp/form/form';
import SignUpButton from '../components/signUp/form/signUpButton';
import React from "react";
import GlobalStyles from '../components/globalStyle';

const SignUp = () => {
    return (
        <View
            style={{ flex: 1, backgroundColor: COLORS.secondary, padding: 24 }}>
            <StatusBar barStyle='light-content' />
            <SafeAreaView
                style={GlobalStyles.droidSafeArea}>
                <Stack.Screen
                    options={{ headerShown: false, autoHideHomeIndicator: true, }}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Logo />
                        <Message />
                        <Form />
                        <SignUpButton />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
export default SignUp;