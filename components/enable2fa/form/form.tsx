import React, { useState } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
import { Stack, useRouter, Link, useLocalSearchParams } from 'expo-router';
import styles from '../../signUp/form/form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { Amplify } from 'aws-amplify';
import { signUp } from 'aws-amplify/auth';
import outputs from "../../../amplify_outputs.json";
import { Redirect } from 'expo-router';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/../../amplify/data/resource";
import { userInfo } from 'os';

const Form = () => {
    const router = useRouter();
    const [isError, setIsError] = useState<boolean>(false);
    const [errorOutput, setErrorOutput] = useState<string>("");
    const [phoneNum, setPhoneNum] = useState<string>("");
    const [isTFA, setIsTFA] = useState<number>(0);
    const { email = "", password = "" } = useLocalSearchParams(); // Default values to avoid undefined

    function handleCheck(){
        setIsTFA(prev => prev === 0 ? 1 : 0);
    }

    async function handleSubmit() {
        if (phoneNum.length !== 10){
            setIsError(true);
            setErrorOutput("Please enter a valid phone number");
            return;
        }
        try {
            const phonestr = "+1" + phoneNum;
            console.log(phonestr);
            
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: email.toString(),
                password: password.toString(),
                options: {
                    userAttributes: {
                        email: email.toString(),
                        phone_number: phonestr
                    }
                }
            });

            router.push({
                pathname: 'verify',
                params: { email, password, isTFA }
            });

        } catch (error) {
            const { message } = error;
            setIsError(true);
            setErrorOutput(message);
        }
    }

    return (
        <View style={{ flexDirection: 'column' }}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your Phone Number"
                    value={phoneNum}
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                    onChangeText={(text) => setPhoneNum(text)}
                />
                <Image
                    source={icons.email}
                    resizeMode="contain"
                    style={styles.emailLogo}
                />
            </View>

            <View style={styles.termsContainer}>
                <TouchableOpacity onPress={handleCheck}>
                    <View style={styles.checkbox}>
                        {isTFA === 1 && <View style={styles.checkboxTick} />}
                    </View>
                </TouchableOpacity>
                <Text style={styles.termsText}>
                    Enable Two Factor Authentication
                </Text>
            </View>

            {isError && (
                <View>
                    <Text style={styles.errorText}>{errorOutput}</Text>
                </View>
            )}

            <TouchableOpacity style={styles.signInContainer} onPress={handleSubmit}>
                <Text style={styles.signInText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Form;