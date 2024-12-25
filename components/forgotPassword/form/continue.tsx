import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Pressable } from 'react-native';
import styles from '../../signUp/form/form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import {Stack, useRouter, Link} from 'expo-router';

const Continue = () => {
    const router = useRouter();
    return (
        <View>
            <Pressable onPress={() => router.push("verify")} >
            <View style={styles.signInContainer}>

                <Text style={styles.signInText}>Continue</Text>
            </View>
            </Pressable>
            
        </View>

    )
}
export default Continue;