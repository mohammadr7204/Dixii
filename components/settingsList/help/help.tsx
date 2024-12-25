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
            
            <TouchableOpacity style={styles.buttonContainer}>
                <Image
                    source={icons.question}
                    resizeMode="contain"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        FAQ
                    </Text>
                    <Text style={styles.subText}>
                        Our solutions for common questions and inquiries
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
                    source={icons.setting}
                    resizeMode="contain"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Troubleshooting
                    </Text>
                    <Text style={styles.subText}>
                        Our guides for any problem you might encounter.
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
                    source={icons.user}
                    resizeMode="contain"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Contact Us
                    </Text>
                    <Text style={styles.subText}>
                        Contact our team directly regarding any queries.
                    </Text>
                </View>
                <Image
                    source={icons.rightArrow}
                    resizeMode="contain"
                    style={styles.arrow}
                />
            </TouchableOpacity>
            
            
            
        <Text style={{...styles.signOutText, color: COLORS.gray, textAlign: 'center', marginTop: 10}}>Contact Details</Text>
        <Text style={{...styles.signOutText, color: COLORS.gray, textAlign: 'center', marginTop: 10}}>Please reach out to us at info@niura.com or call our office number at (111)-111-1111 </Text>
        </View>
    )
}
export default Updates;