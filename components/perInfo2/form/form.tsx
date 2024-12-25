import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '../../signUp/form/form.style';
import { COLORS, SIZES, FONT } from "../../../constants";
import {Stack, useRouter, Link, useLocalSearchParams} from 'expo-router';
import { type Schema } from '../../../amplify/data/resource';
import outputs from "../../../amplify_outputs.json";
import { generateClient } from 'aws-amplify/data';
import { signUp } from 'aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Notifications from 'expo-notifications';

const router = useRouter();
const client = generateClient<Schema>()

const ageOptions = Array.from({ length: 83 }, (_, i) => ({ label: `${i + 18}`, value: i + 18 }));
const ethnicityOptions = [
    { label: "African American", value: "African American" },
    { label: "Asian", value: "Asian" },
    { label: "Caucasian", value: "Caucasian" },
    { label: "Hispanic", value: "Hispanic" },
    { label: "Native American", value: "Native American" },
    { label: "Pacific Islander", value: "Pacific Islander" },
    { label: "Other", value: "Other" },
];

const DropdownComponent = () => {
    const [age, setAge] = useState<string>('');
    const [ethnicity, setEthnicity] = useState<string>('');
    const [isFocus, setIsFocus] = useState(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorOutput, setErrorOutput] = useState<string>('');
    const { email, username, firstName, lastName } = useLocalSearchParams();
    let id = '';
    let occupation = '';
    let education = '';

    const createUser = async (email, username, firstName, lastName, age, ethnicity, occupation, education) => {
        console.log(email, username, firstName, lastName, age, ethnicity);
        try {
            const { errors, data: newUser } = await client.models.Users.create({
                email: email,
                username: username,
                firstName: firstName,
                lastName: lastName,
                age: age,
                ethnicity: ethnicity,
                occupation: occupation,
                education: education
              })
              const { data: userData } = await client.models.Data.create({
                dataId: email,
                focusArray: [],
                stressArray: [],
                timeArray: [],
                focusTime: [],
                focusTimeArray: [],
                badgesArray: [],
                daysActive: [],
                
              })
              await AsyncStorage.setItem("email", email.toString());
              await AsyncStorage.setItem("firstName", firstName.toString());
              await AsyncStorage.setItem("lastName", lastName.toString());

              console.log(newUser.id);
        } catch (error) {
            setIsError(true);
            setErrorOutput(error.message);
        }
        
    }

    async function handleSubmit() {
        console.log(id);
        const numericAge = parseInt(age, 10);
        if (isNaN(numericAge) || numericAge < 13 || numericAge > 100) {
            setIsError(true);
            setErrorOutput('Age must be between 13 and 100.')
        }
        else if (ethnicity.trim() === '') {
            setIsError(true);
            setErrorOutput('Please choose an ethnicity.')
        }
        else {         
            await createUser(email, username, firstName, lastName, age, ethnicity, occupation, education);
            try {  
                //await scheduleDailyReminderNotification();
                router.push({ pathname: 'home'});
            }
            catch(error){
                setIsError(true);
                setErrorOutput(error.message);
            }
            
        }
    }

    // async function scheduleDailyReminderNotification() {
    //     // Check if notification permissions are granted
    //     const { status } = await Notifications.getPermissionsAsync();
    //     if (status !== 'granted') {
    //       await Notifications.requestPermissionsAsync();
    //     }
      
    //     await Notifications.scheduleNotificationAsync({
    //       content: {
    //         title: "Daily Reminder",
    //         body: "Don't forget to check your tasks in the app today!",
    //         sound: 'default',
    //       },
    //       trigger: {
    //         hour: 9, // 9 AM
    //         minute: 0,
    //         repeats: true, // Repeat every day
    //       },
    //     });
      
    //     console.log('Daily reminder notification scheduled');
    //   }

  return (
    <View>
        <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Age" 
                    placeholderTextColor="#808080" 
                    autoCapitalize='none' 
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                />
        </View>
        <View style={styles.dropdownContainer}>
            <Dropdown
                style={[styles.dropdown]}
                containerStyle={styles.list}
                itemTextStyle={{color: COLORS.gray2}}
                activeColor={COLORS.gray3}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={ethnicityOptions}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Ethnicity'}
                searchPlaceholder="Search"
                value={ethnicity}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setEthnicity(item.value);
                    setIsFocus(false);
                }}
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
    
    
  );
};

export default DropdownComponent;