import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { images } from '../../../constants';
import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert, TouchableOpacityComponent } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import styles from './header.style';

const Header = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Image
                    style={styles.arrow}
                    source={icons.leftArrow}
                    resizeMode="contain" />
            </TouchableOpacity>
            <Text style={styles.text}>
                To Do
            </Text>
        </View>
    )
}
export default Header;