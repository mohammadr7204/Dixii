import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
import styles from './form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
//import { UseAuthenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import {Amplify} from "aws-amplify";
import {signIn} from 'aws-amplify/auth';
import outputs from "../../../amplify_outputs.json"
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

Amplify.configure(outputs);

const Form =  () => {
    const router = useRouter();
    //const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>("");

    // const handleLogin = async () => {
    //    // const [user, signIn] = useAuthenticator(())
    // }
    async function handleSubmit(){
        try {
        const response = await signIn({
            username: email,
            password: password
        })
        let str = await AsyncStorage.getItem('email');
        if (email != str){
            await AsyncStorage.setItem('email', email);
        }
        router.push('home');
    } 
        catch (error){
            console.error('Error signing in', error.underlyingError);
            Alert.alert('Error', 'Failed to sign in. Please check your credentials and try again.');
        }
        
        
    }
    
    return (
        <View style = {{ marginTop: 15}}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Enter Your Email" placeholderTextColor="#808080" autoCapitalize='none' value={email} onChangeText={(text)=> setEmail(text)}/>
                <Image
                    source={icons.email}
                    resizeMode='contain'
                    style={styles.emailLogo}
                />

            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Enter your password" placeholderTextColor="#808080" secureTextEntry autoCapitalize='none' value={password} onChangeText={(text) => setPassword(text)} />
                <Image
                    source={icons.lock}
                    resizeMode='contain'
                    style={styles.emailLogo}
                />
            </View>
            <TouchableOpacity onPress={() => router.push('forgotPassword')}>
            <Text style={{
                                color: COLORS.primary,
                                textAlign: 'right',
                                fontSize: SIZES.small,
                                fontFamily: FONT.semi,
                                
                            }}>
                                Forgot Password?
                            </Text>
                            </TouchableOpacity>
            <TouchableOpacity style={styles.signInContainer} onPress={handleSubmit}>
                
                <Text style={ styles.signInText }>Sign in</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Form;