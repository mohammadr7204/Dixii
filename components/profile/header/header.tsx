import React, { useState, useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import styles from "./header.style";
import { icons, images } from "../../../constants";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from "aws-amplify/data";
import { Schema } from '../../../amplify/data/resource';
import AsyncStorage from "@react-native-async-storage/async-storage";

const client = generateClient<Schema>();

const Header = () => {
    
    const [firstname, setFirstName] = useState<string>('');
    const [lastname, setLastName] = useState<string>('');
    const [occupation, setOccupation] = useState<string>('');
    const [education, setEducation] = useState<string>('');
    const [pfpUrl, setPfpUrl] = useState<string>(null);
    const getPfp = async () => {
        const data = await AsyncStorage.getItem("pfp");
        if (data) {
          setPfpUrl(data);
        }
    
    
    
      }
    useEffect(() => {
        getData();
        setName();
        getPfp();
    }, []);

    async function getData() {
        try {
            const userAttributes = await fetchUserAttributes();
            const id = userAttributes.email;
            if (id) {
                const { data: td } = await client.models.Users.get({
                    email: id
                });
                setOccupation(td.occupation);
                setEducation(td.education);
                
            }
        } catch (error) {
            console.error(error);
            setFirstName('Studious');
            setLastName('Student');
            setOccupation("Occupation Not Set");
            setEducation("Education Not Set");

        }
    }

    async function setName() {
        try {
          setFirstName(await AsyncStorage.getItem("firstName"));
          setLastName(await AsyncStorage.getItem("lastName"));
        } catch (error) {
          console.error("Error fetching user attributes or user data", error);
        }
      }

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
                Profile
            </Text>
            <View style={styles.profileContainer}>
                <View style={styles.topContainer}>
                {pfpUrl && (
          <View>
            <Image
              source={{ uri: pfpUrl }}
              resizeMode='contain'
              style={styles.pfp}
            />
          </View>
        )}
        {!pfpUrl && (
          <View>
            <Image
              source={images.noBadge}
              resizeMode='contain'
              style={styles.pfp}
            />
          </View>
        )}
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>
                            {firstname} {lastname}
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>
                        {education}
                    </Text>
                    <Text style={{ ...styles.bottomText, textAlign: 'center' }}>
                        |
                    </Text>
                    <Text style={{ ...styles.bottomText, textAlign: 'right' }}>
                        {occupation}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Header;
