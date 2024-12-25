import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import styles from './form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { Amplify } from 'aws-amplify';
import { signUp } from 'aws-amplify/auth';
import outputs from "../../../amplify_outputs.json";
import { Redirect } from 'expo-router';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/../../amplify/data/resource";
import { userInfo } from 'os';

const client = generateClient<Schema>() // use this Data client for CRUDL requests

Amplify.configure(outputs);

const Form = () => {
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [confPassword, setconfPassword] = useState<string> ('');
    const [errorOutput, setErrorOutput] = useState<string>(undefined);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isError, setIsError] = useState<boolean>(false);

    async function handleCheck(){
        if (isTermsAccepted){
            setIsTermsAccepted(false);
        }
        else{
            router.push("termsConditions");
            setIsTermsAccepted(true);
        }
    }
    
    async function handleSubmit() {

        if (!isTermsAccepted) {
            setIsError(true);
            setErrorOutput("You must accept the terms and conditions");
            return;
        }

        if (password.length < 8){
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
        if (password.localeCompare(confPassword) != 0){
            setIsError(true);
            setErrorOutput("Passwords Do Not Match");
            return; 
        }
        

        try {
            
            const { isSignUpComplete, userId, nextStep} = await signUp({
                
                username: email,
                password: password,
                
                options: {
                    userAttributes: {
                        email: email,
                        
                    }
                }
            })
            
            router.push({ pathname: 'verify', params: { email, password } });
        }
        catch (error){
            const {code, message} = error;
            setIsError(true);
            setErrorOutput(message);
        }
    }

    return (
        <View style = {{flexDirection: 'column'}}>

            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Enter your email" value={email} placeholderTextColor="#808080" autoCapitalize='none' onChangeText={(text) => setEmail(text)}/>
                <Image
                    source={icons.email}
                    resizeMode='contain'
                    style={styles.emailLogo}
                />

            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Enter your password" placeholderTextColor="#808080" secureTextEntry autoCapitalize='none' value={password} onChangeText={(text) => setPassword(text)}/>
                <Image
                    source={icons.lock}
                    resizeMode='contain'
                    style={styles.emailLogo}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Confirm Password" placeholderTextColor="#808080" secureTextEntry  autoCapitalize='none' value={confPassword} onChangeText={(text) => setconfPassword(text)}/>
                <Image
                    source={icons.lock}
                    resizeMode='contain'
                    style={styles.emailLogo}
                />
            </View>

            <View>
                <Text style={styles.passRequirements}>Password must contain: uppercase letter, lowercase letter, number, special character.</Text>
            </View>
            <View style={styles.termsContainer}>
                <TouchableOpacity onPress={handleCheck}>
                    <View style={styles.checkbox}>
                        {isTermsAccepted && <View style={styles.checkboxTick} />}
                    </View>
                </TouchableOpacity>
                <Text style={styles.termsText}>
                    Please Read Our <Text style={styles.termsLink} onPress={() => router.push("termsConditions")}>Terms and Conditions</Text>
                </Text>
            </View>
            {isError && (
                <View >
                    <Text style={styles.errorText}>{errorOutput}</Text>
                </View>
            )}
            <TouchableOpacity style={styles.signInContainer} onPress={handleSubmit}>
                <Text style={styles.signInText}>Sign Up</Text>
            </TouchableOpacity>

                   
            

        </View>
    )
}
export default Form;