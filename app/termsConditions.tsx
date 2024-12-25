import { View, Text, ScrollView, SafeAreaView, Image, StatusBar, Pressable } from "react-native";
import { useState } from 'react';
import { Stack, useRouter, Link} from 'expo-router';
import { COLORS, FONT, SIZES, SHADOWS, icons, images } from '../constants';
import Logo from '../components/common/logo/logo';
import BackArrow  from "../components/termsConditions/backArrow";
import Terms from '../components/termsConditions/terms'
import React from "react";
import GlobalStyles from '../components/globalStyle';

const TermsConditions = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.secondary, padding: 24 }}>
            <StatusBar barStyle='light-content' />
            <SafeAreaView
                style={GlobalStyles.droidSafeArea}>
                <Stack.Screen
                    options={{ headerShown: false, autoHideHomeIndicator: true, }}
                />
                <View>
                    <BackArrow />
                </View>
                <ScrollView showsVerticalScrollIndicator= {false}  >
                    <View>
                        <Terms />

                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
export default TermsConditions;