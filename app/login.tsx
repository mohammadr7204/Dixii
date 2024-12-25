// app/login.tsx
import { View, Text, ScrollView, SafeAreaView, Image, StatusBar, Pressable } from "react-native";
import { useState, useEffect } from 'react';
import { Stack, useRouter, Link } from 'expo-router';
import { COLORS, FONT, SIZES, SHADOWS, icons, images } from '../constants';
import Logo from "../components/common/logo/logo";
import Message from "../components/login/message/message";
import Form from "../components/login/form/form";
import SignInButton from "../components/login/form/SignInButton";
import LogoButtons from "../components/login/form/logoButtons";
import React from "react";
import GlobalStyles from '../components/globalStyle';
//import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { getCurrentUser } from 'aws-amplify/auth';

const Login = () => {
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

    useEffect(() => {
        if (loggedIn) {
            router.push('home');
        }
    }, [loggedIn, router]);

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.secondary, padding: 24 }}>
            <StatusBar barStyle='light-content' />
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <Stack.Screen
                    options={{
                        headerShown: false,
                        autoHideHomeIndicator: true,
                    }}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Logo />
                        <Message />
                        <Form />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingTop: 20,
                            width: '90%',
                            paddingLeft: 35,
                            marginBottom: 10
                        }}>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, marginBottom: 10 }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#1C252E' }} />
                                    <View>
                                        <Text style={{ width: 50, textAlign: 'center', color: '#808080', fontSize: 16, fontFamily: FONT.regular }}>OR</Text>
                                    </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#1C252E' }} />
                            </View> */}
                        </View>
                        {/* <Pressable onPress={() => router.push("/")}>
                            <LogoButtons img={icons.google} brandName="Google" />
                        </Pressable>
                        <Pressable onPress={() => router.push("/")}>
                            <LogoButtons img={icons.apple} brandName="Apple" />
                        </Pressable> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                            <Text style={{
                                color: COLORS.white,
                                fontFamily: FONT.regular,
                                fontSize: SIZES.small,
                                textAlign: 'center',
                                justifyContent: 'center',
                            }}>
                                Don't have an account?
                            </Text>
                            <Pressable onPress={() => router.push("/signUp")}>
                                <Text style={{
                                    color: COLORS.primary,
                                    fontFamily: FONT.semi,
                                    fontSize: SIZES.small,
                                    paddingLeft: 10,
                                }}>
                                    Sign Up
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Login;
