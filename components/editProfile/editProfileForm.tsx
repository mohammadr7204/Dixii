import React, { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import styles from "./editProfile.styles";
import { a } from "@aws-amplify/backend";

const EditProfileForm = () => {
  const router = useRouter();
  const client = generateClient<Schema>();
  const [username, setUsername] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  useEffect(() => {
    getData();
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
          setUsername(td.username);
          
      }
  } catch (error) {
      console.error(error);

      
  }
}

  
  async function updateData() {
    const attributes = await fetchUserAttributes();

    
    const newData = {
      email: attributes.email.toString(),
      username: username,
      occupation: occupation,
      education: education,
    };
    try{
      const {data: updatedData, errors} = await client.models.Users.update(newData);
      router.push('profile');
    }
    catch(error){
      console.error(error);
    }
  }


  return (
    <View>
    <View style={styles.formContainer}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder={username}
          placeholderTextColor="#808080"
          autoCapitalize="none"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Occupation</Text>
        <TextInput
          style={styles.textInput}
          placeholder={occupation}
          placeholderTextColor="#808080"
          autoCapitalize="none"
          value={occupation}
          onChangeText={(text) => setOccupation(text)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Education</Text>
        <TextInput
          style={styles.textInput}
          placeholder={education}
          placeholderTextColor="#808080"
          autoCapitalize="none"
          value={education}
          onChangeText={(text) => setEducation(text)}
        />
      </View>
      
    </View>
    <View style={styles.submitContainer}>
    <TouchableOpacity style={styles.submitButton} onPress={updateData}>
      <Text style={styles.submitText}>Submit</Text>
    </TouchableOpacity>
  </View>
  </View>
  );
};

export default EditProfileForm;
