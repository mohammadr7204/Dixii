
import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput } from 'react-native';
import styles from './form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';

const SignInButton = () => {
    return (
        <View style={styles.signInContainer}>
                
                <Text style={ styles.signInText}>Sign in</Text>
            </View>
    )
}

export default SignInButton;