import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { images } from '../../../constants';
import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert, TouchableOpacityComponent } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import styles from "../list.style";

const Pass = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('settingsPages/changePass')}>
                <Image
                    source={icons.lock}
                    resizeMode="contain"
                    style={styles.icon}
                />
                <View style={styles.textContainer} >
                    <Text style={styles.mainText}>
                        Change Password
                    </Text>
                    <Text style={styles.subText}>
                        In case of forgotten, outdated, or unused passwords
                    </Text>
                </View>
                <Image
                    source={icons.rightArrow}
                    resizeMode="contain"
                    style={styles.arrow}
                />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.buttonContainer}>
            <Image
                    source={icons.user}
                    resizeMode="contain"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Manage 2FA
                    </Text>
                    <Text style={styles.subText}>
                        Add another layer of security to your account.
                    </Text>
                </View>
                <Image
                    source={icons.rightArrow}
                    resizeMode="contain"
                    style={styles.arrow}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
            <Image
                    source={icons.lock}
                    resizeMode="contain"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Security Questions
                    </Text>
                    <Text style={styles.subText}>
                        Ensure full account recovery in case of lost account.
                    </Text>
                </View>
                <Image
                    source={icons.rightArrow}
                    resizeMode="contain"
                    style={styles.arrow}
                />
            </TouchableOpacity> */}
        </View>
    )
}
export default Pass