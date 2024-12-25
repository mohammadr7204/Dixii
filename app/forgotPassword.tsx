import { View, Text, ScrollView, SafeAreaView, Image, StatusBar, Pressable } from "react-native";
import { useState } from 'react';
import { Stack, useRouter, Link } from 'expo-router';
import { COLORS, FONT, SIZES, SHADOWS, icons, images } from '../constants';
import Logo from '../components/common/logo/logo';
import Message from '../components/forgotPassword/message/message';
import Form from '../components/forgotPassword/form/form';
import React from "react";
import Continue from '../components/forgotPassword/form/continue';
import GlobalStyles from '../components/globalStyle';

const ForgotPassword = () => {
    return (
        <View
            style={{ flex: 1, backgroundColor: COLORS.secondary }}>
            <StatusBar barStyle='light-content' />
            <SafeAreaView
                style={ GlobalStyles.droidSafeArea }>
                <Stack.Screen
                    options={{ headerShown: false, autoHideHomeIndicator: true, }}
                />
                <ScrollView>
                    <View style = {{padding: 24}}>
                    <Logo />
                    <Message /> 
                    <Form /> 
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
export default ForgotPassword;