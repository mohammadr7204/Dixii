import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput } from 'react-native';
import styles from './form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { Amplify } from 'aws-amplify';
import { signInWithRedirect } from 'aws-amplify/auth';
import { useRouter } from 'expo-router';

interface LogoButtonsProps {
    img: any;
    brandName: string;
}
const LogoButtons: React.FC<LogoButtonsProps> = ({img, brandName}) => {
    const router= useRouter();
    async function handleSubmit(){
        router.push('home');
        signInWithRedirect({ provider: "Google" })
    }
    return (
        <TouchableOpacity style = { styles.googleButton} onPress={handleSubmit}> 
            <Image
                    source={img}
                    resizeMode='contain'
                    style={styles.brandLogo}
                />
            <Text style = {styles.logoText}>
                Continue with {brandName}
            </Text>
        </TouchableOpacity>
    )
}
export default LogoButtons;