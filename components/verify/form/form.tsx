import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert} from 'react-native';
import { Stack, useRouter, Link, useLocalSearchParams } from 'expo-router';
import styles from './form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { confirmSignIn, confirmSignUp, signIn } from 'aws-amplify/auth';
import outputs from "../../../amplify_outputs.json"
import { updateMFAPreference } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';

Amplify.configure(outputs);

const Form = () => {
    const router = useRouter();
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null)

    const [inputOne, updateInputOne] = useState<string>('');
    const [inputTwo, updateInputTwo] = useState<string>('');
    const [inputThree, updateInputThree] = useState<string>('');
    const [inputFour, updateInputFour] = useState<string>('');
    const [inputFive, updateInputFive] = useState<string>('');
    const [inputSix, updateInputSix] = useState<string>('');

    const { email, password} = useLocalSearchParams();

    const handleInputChange = (text, updateFunction, ref) => {
        updateFunction(text);
        if (/^\d$/.test(text) && ref.current) {
            ref.current.focus();
        }
    };
    async function logIn(){
        try {
            const nextStep = await signIn({
                username: email.toString(),
                password: password.toString()
            })
            // if (isTFA){
            //     await updateMFAPreference({
            //         sms: 'ENABLED'
            //     })
            // }
            // else {
            //     await updateMFAPreference({
            //         sms: 'DISABLED'
            //     })
            // }
            router.push({ pathname: 'perInfo', params: { email } });
        }
        catch(error){
            console.error('Error Signin', error);
            
        }
    }
    async function handleSubmit(){
        console.log(email, inputOne + inputTwo + inputThree + inputFour + inputFive + inputSix)
        try{
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username: email.toString(),
                confirmationCode: inputOne + inputTwo + inputThree + inputFour + inputFive + inputSix,
              })
            
            logIn()
        }
        catch(error){
            console.error('Error Verifying', error);
            Alert.alert('Error', 'Failed to Verify. Please check your credentials and try again.');
        }
        
    }
    return (
        <View>
            <View style={styles.container}>
            <View style={styles.smallContainer}>
                <TextInput
                    style={styles.textInput}
                    value={inputOne}
                    ref={input1Ref}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange(text, updateInputOne, input2Ref)}
                />
            </View>
            <View style={styles.smallContainer}>
                <TextInput
                    style={styles.textInput}
                    value={inputTwo}
                    ref={input2Ref}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange(text, updateInputTwo, input3Ref)}
                />
            </View>
            <View style={styles.smallContainer}>
                <TextInput
                    style={styles.textInput}
                    value={inputThree}
                    ref={input3Ref}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange(text, updateInputThree, input4Ref)}
                />
            </View>
            <View style={styles.smallContainer}>
                <TextInput
                    style={styles.textInput}
                    value={inputFour}
                    ref={input4Ref}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange(text, updateInputFour, input5Ref)}
                />
            </View>
            <View style={styles.smallContainer}>
                <TextInput
                    style={styles.textInput}
                    value={inputFive}
                    ref={input5Ref}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange(text, updateInputFive, input6Ref)}
                />
            </View>
            <View style={styles.smallContainer}>
                <TextInput
                    style={styles.textInput}
                    value={inputSix}
                    ref={input6Ref}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange(text, updateInputSix, input6Ref)}
                />
            </View>
        </View>
            <TouchableOpacity style={styles.verifyContainer} onPress={handleSubmit}>
                <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
        </View>
        
    );
};

export default Form;