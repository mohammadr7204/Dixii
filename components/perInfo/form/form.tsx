import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Pressable, Alert } from 'react-native';
import styles from '../../signUp/form/form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import type { Schema } from '../../../amplify/data/resource'; // Path to your backend resource definition
import outputs from "../../../amplify_outputs.json";
import {Stack, useRouter, Link, useLocalSearchParams} from 'expo-router';

import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';

Amplify.configure(outputs);

const Form = () => {
    const router = useRouter();
    const client = generateClient<Schema>()

    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorOutput, setErrorOutput] = useState<string>(undefined);
    const { email } = useLocalSearchParams();

    async function handleSubmit () {
        console.log(username, firstName, lastName);
        if (!/^[a-z0-9._]*$/.test(username)) {
            setIsError(true);
            setErrorOutput('Username can only contain lowercase letters, numbers, periods, and underscores.')
        }
        else if (!/^[a-zA-Z\s-]*$/.test(firstName)) {
            setIsError(true);
            setErrorOutput('First Name can only contain letters, spaces, and hyphens.')
        }
        else if (!/^[a-zA-Z\s-]*$/.test(lastName)) {
            setIsError(true);
            setErrorOutput('Last Name can only contain letters, spaces, and hyphens.')
        }
        else {         
            try {
                router.push({ pathname: 'perInfo2', params: { email, username, firstName, lastName } });
            }
            catch(error){
                setIsError(true);
                setErrorOutput(error);
            }
        
        }
    }

    return (
        <View style = {{flexDirection: 'column'}}>

            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Username" 
                    placeholderTextColor="#808080" 
                    autoCapitalize='none'
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <Image
                    source={icons.email}
                    resizeMode='contain'
                    style={styles.emailLogo}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="First Name" 
                    placeholderTextColor="#808080" 
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
                <Image
                    source={icons.lock}
                    resizeMode='contain'
                    style={styles.emailLogo}
                />

            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Last Name" 
                    placeholderTextColor="#808080" 
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
                <Image
                    source={icons.lock}
                    resizeMode='contain'
                    style={styles.emailLogo}
                />
            </View>
            {isError && (
                <View >
                    <Text style={styles.errorText}>{errorOutput}</Text>
                </View>
            )}
            <Pressable onPress={handleSubmit} >
                <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>Continue</Text>
                </View>
            </Pressable>
        </View>
    )
}
export default Form;