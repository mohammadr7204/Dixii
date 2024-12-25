import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { images } from '../../../constants';
import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert, TouchableOpacityComponent } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import styles from "./update.style";

const Update = () => {
    return (
        <View style={styles.container}>
            <Image
                source={icons.brain}
                resizeMode="contain"
                style={styles.icon}
                />
            <Text style={styles.mainText}>
                Coming In Future Updates!
            </Text>
            <Text style={styles.subText}>
                Please stay tuned for new features coming 2025!
            </Text>
        </View>
    )
}
export default Update;