import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { images } from '../../../constants';
import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert, TouchableOpacityComponent, Switch } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import styles from "../list.style";
const Updates = () => {
    return (
        <View style={styles.container}>
            <Text style={{...styles.mainText, textAlign: 'center', marginTop : 20}}>
                You are up to date!
            </Text>
            <TouchableOpacity style={styles.buttonContainer}>
                <Image
                    source={icons.note}
                    resizeMode="contain"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        v1.0.0
                    </Text>
                    <Text style={styles.subText}>
                        We present to you... Deepwork!
                    </Text>
                </View>
                <Image
                    source={icons.rightArrow}
                    resizeMode="contain"
                    style={styles.arrow}
                />
            </TouchableOpacity>
            
            
            <TouchableOpacity style={styles.signOutButton} >
        <Text style={{...styles.signOutText, color: COLORS.gray}}>Update to v1.0.0</Text>
             </TouchableOpacity>
        </View>
    )
}
export default Updates;