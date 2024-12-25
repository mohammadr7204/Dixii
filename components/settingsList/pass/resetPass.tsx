import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { images } from '../../../constants';
import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert, TouchableOpacityComponent, Switch } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import styles from "../list.style";
import { fetchUserAttributes, resetPassword } from 'aws-amplify/auth';

const ResetPass = () => {
    const [isPressed, setIspressed] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorOutput, setErrorOutput] = useState<string>("");
    const router = useRouter();
    async function handleReset(){
        
        try{
            const userAttributes = await fetchUserAttributes();
            const email = userAttributes.email;
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
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => handleReset()}>
            {/* <Image
                    source={icons.lock}
                    resizeMode="contain"
                    style={styles.icon}
                /> */}
                <View style={styles.textContainer} >
                    <Text style={{...styles.mainText, textAlign: 'center'}}>
                        Confirm Reset Password
                    </Text>
                    {/* <Text style={styles.subText}>
                        In case of forgotten, outdated, or unused passwords
                    </Text> */}
                </View>
            </TouchableOpacity>
            {isError && (
                <View >
                    <Text style={{...styles.subText, color: COLORS.red}}>{errorOutput}</Text>
                </View>
            )}

        </View>
    )
}
export default ResetPass;