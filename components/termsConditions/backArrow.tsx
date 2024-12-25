import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert, TouchableOpacityComponent } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import styles from './terms.style';
import { COLORS, SIZES, FONT } from "../../constants";
import { icons } from '../../constants';
import { images } from '../../constants';

const BackArrow = () => {
    const router= useRouter();
    return (
        <View>
        <TouchableOpacity style={styles.logoContainer} onPress={() => router.back()} >
                <Image
                    source={icons.leftArrow}
                    style={styles.arrowLogo}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            </View>
    )
}
export default BackArrow;