import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Pressable } from 'react-native';
import styles from './form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import {Stack, useRouter, Link} from 'expo-router';

const SignUpButton = () => {
    const router = useRouter();
    return (
        <View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, marginBottom: 10 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#1C252E' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center', color: '#808080', fontSize: 16, fontFamily: FONT.regular }}>OR</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: '#1C252E' }} />

            </View>
            <Pressable onPress={() => router.push("home")} >
            <View style={styles.googleButton}>
                <Image
                    source={icons.google}
                    resizeMode='contain'
                    style={styles.brandLogo}
                />
                <Text style={styles.logoText}>
                    Continue with Google
                </Text>
            </View>
            </Pressable>
            <Pressable onPress={() => router.push("home")} >
            <View style={styles.googleButton}>
                <Image
                    source={icons.apple}
                    resizeMode='contain'
                    style={styles.brandLogo}
                />
                <Text style={styles.logoText}>
                    Continue with Apple
                </Text>
            </View>
            </Pressable> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, justifyContent:'center' }}>
                        <Text style={{ color: 'white', fontFamily: FONT.regular, fontSize: SIZES.small, textAlign: 'center', }}>
                            Already have an Account?
                        </Text>
                        <Pressable onPress={() => router.push("/login")}>
                            <Text style={{
                                color: COLORS.primary,
                                fontFamily: FONT.semi,
                                fontSize: SIZES.small,
                                paddingLeft: 10,
                            }}>
                                Sign In
                            </Text>
                        </Pressable>
                    </View>
        </View>

    )
}

export default SignUpButton;