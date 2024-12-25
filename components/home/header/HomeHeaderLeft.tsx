import { Image, View, Text, TouchableOpacity, Platform } from "react-native";
import styles from "./header.style";
import React, { useState, useEffect } from "react";
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../../amplify/data/resource';
import { launchImageLibrary, launchCamera, MediaType } from 'react-native-image-picker';
//import RNFS from 'react-native-fs';
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES } from "../../../constants";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
interface HomeHeaderLeftProps {
  img: any;
}

const HomeHeaderLeft: React.FC<HomeHeaderLeftProps> = ({ img }) => {
  const [name, setName] = useState<string>('');
  const [pfpUrl, setPfpUrl] = useState<string>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const client = generateClient<Schema>();
  const handlePress = () => {
    setModalVisible(true);
  }
  const getPfp = async () => {
    const data = await AsyncStorage.getItem("pfp");
    if (data) {
      setPfpUrl(data);
    }



  }
  


  async function getName() {
    try {     
          setName(await AsyncStorage.getItem("firstName"));
    } catch (error) {
      console.error('Error fetching user attributes or user data', error);
    }
  }

  useEffect(() => {
    getPfp();
    getName();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.picContainer} onPress={handlePress}>
        {pfpUrl && (
          <View>
            <Image
              source={{ uri: pfpUrl }}
              resizeMode='contain'
              style={styles.profile}
            />
          </View>
        )}
        {!pfpUrl && (
          <View>
            <Image
              source={img}
              resizeMode='contain'
              style={styles.profile}
            />
          </View>
        )}

      </TouchableOpacity>
      <View style={styles.text}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
      
    </View>
  );
};

export default HomeHeaderLeft;
