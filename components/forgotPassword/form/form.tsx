import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Pressable } from 'react-native';
import styles from '../../signUp/form/form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { useRouter } from 'expo-router';
import { resetPassword } from 'aws-amplify/auth';
import outputs from "../../../amplify_outputs.json"
import { Amplify } from 'aws-amplify';

Amplify.configure(outputs);

const Form = () => {
    const [email,setEmail] = useState('');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorOutput, setErrorOutput] = useState<string>(undefined);
    const router = useRouter();
    async function handleReset(){
        try{
         const output = await resetPassword({
            username: email
         })
         router.push( {pathname: 'verifyNewPass', params: { email }} );
        }
        catch(error){
            const {code, message} = error;
            setIsError(true);
            setErrorOutput(message);
        }
    }
    return (
        <View style={{marginTop: 32}}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder='Enter your Email' placeholderTextColor="#808080" value={email} autoCapitalize='none' onChangeText={(text) => setEmail(text)}/>
                <Image
                    source={icons.email}
                    resizeMode='contain'
                    style={styles.emailLogo}
                />
            </View> 
            {isError && (
                <View >
                    <Text style={styles.errorText}>{errorOutput}</Text>
                </View>
            )}
            <View>
            <Pressable onPress={handleReset} >
            <View style={styles.signInContainer}>

                <Text style={styles.signInText}>Continue</Text>
            </View>
            </Pressable>
            
        </View>

        </View>
    )
}
export default Form;