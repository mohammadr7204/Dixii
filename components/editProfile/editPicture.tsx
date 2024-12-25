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
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import styles from "./editProfile.styles";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditPicture = () => {
  const [pfpUrl, setPfpUrl] = useState<string>(null);
  const getPfp = async () => {
    
    const data = await AsyncStorage.getItem("pfp");
    if (data) {
      setPfpUrl(data);
    }



  }
  const pickImage = async () => {
    // Request permission for the camera and photo library
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      storeImageLocally(result.assets[0].uri);
    }
  };
    
    
  const storeImageLocally = async (uri) => {
    try {
      await AsyncStorage.setItem('pfp', uri);  // Save image URI
      console.log('Image URI stored successfully');
    } catch (error) {
      console.log('Error storing the image URI: ', error);
    }
  };
  const router = useRouter();
  const client = generateClient<Schema>();
  useEffect(() => {
    getPfp();
    
  }, []);

  return (
    <View>
      <View style={styles.pfpContainer}>
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
              source={images.profile}
              resizeMode='contain'
              style={styles.pfp}
            />
          </View>
        )}
        <TouchableOpacity style={styles.editPicButton} onPress={pickImage}>
          <Text style={styles.editPicText}>Edit Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditPicture;
