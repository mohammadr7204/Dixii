import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
import { Stack, useRouter, Link, useLocalSearchParams } from 'expo-router';
import styles from './form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { confirmResetPassword, confirmSignUp } from 'aws-amplify/auth';
import outputs from "../../../amplify_outputs.json"
import { Amplify } from 'aws-amplify';

Amplify.configure(outputs);

const Form = () => {
    const router = useRouter();
    const [verify, updateVerify] = useState<string>(undefined);
    const [password, updatePassword] = useState<string>('');
    const [confPassword, updateConfPassword] = useState<string>('');
    const [errorOutput, setErrorOutput] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const { email } = useLocalSearchParams();

    const handleInputChange = (text, updateFunction, ref) => {
        updateFunction(text);
        if (/^\d$/.test(text) && ref.current) {
            ref.current.focus();
        }
    };
    async function handleSubmit() {
        if (password.length < 8) {
            setIsError(true);
            setErrorOutput("Password Must Contain at Least Eight Characters");
        }
        if (!/\d/.test(password)) {
            setIsError(true);
            setErrorOutput("Password Must Contain at Least One Number")
            return;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setIsError(true)
            setErrorOutput("Password Must Contain at Least One Special Character");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setIsError(true);
            setErrorOutput("Password Must Contain at Least One Uppercase Letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setIsError(true);
            setErrorOutput("Password Must Contain at Least One Lowercase Letter");
            return;
        }
        if (password.localeCompare(confPassword) != 0) {
            setIsError(true);
            setErrorOutput("Passwords Do Not Match");
            return;
        }
        try {
            await confirmResetPassword({
                username: email.toString(),
                confirmationCode: verify,
                newPassword: password
            })
            router.push("home")
        }
        catch (error) {
            const { code, message } = error;
            setIsError(true);
            setErrorOutput(message);
        }
    }
    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholderTextColor="#808080"
                    placeholder='Verification Code'
                    style={styles.textInputPass}
                    value={verify}
                    onChangeText={(text) => updateVerify(text)}
                    />

                    


            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholderTextColor="#808080"
                    placeholder="New Password"
                    autoCapitalize='none'
                    secureTextEntry
                    style={styles.textInputPass}
                    value={password}
                    onChangeText={(text) => updatePassword(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Confirm Password"
                    style={styles.textInputPass}
                    autoCapitalize='none'
                    value={confPassword}
                    secureTextEntry
                    placeholderTextColor="#808080"
                    onChangeText={(text) => updateConfPassword(text)}
                />
            </View>
            {isError && (
                <View >
                    <Text style={styles.errorText}>{errorOutput}</Text>
                </View>
            )}
            <TouchableOpacity style={styles.verifyContainer} onPress={handleSubmit}>
                <Text style={styles.verifyText}>Update Password</Text>
            </TouchableOpacity>
        </View>

    );
};

export default Form;