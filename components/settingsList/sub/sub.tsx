import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { images } from '../../../constants';
import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert, TouchableOpacityComponent, Switch } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import styles from "../list.style";

const Sub = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer}>
                <Image
                    source={icons.subscription}
                    resizeMode="contain"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Current Subscription
                    </Text>
                    <Text style={styles.subText}>
                        View and manage current subscription plan
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
                    source={icons.money}
                    resizeMode="contain"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Payment Method
                    </Text>
                    <Text style={styles.subText}>
                        View and Edit how you pay for your Deepwork subscription.
                    </Text>
                </View>
                <Image
                    source={icons.rightArrow}
                    resizeMode="contain"
                    style={styles.arrow}
                />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.signOutButton} >
        <Text style={styles.signOutText}>Cancel Subscription</Text>
             </TouchableOpacity>
        </View>
    )
}
export default Sub;