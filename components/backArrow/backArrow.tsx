import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './backArrow.styles';
import { icons } from '../../constants';

type BackArrowProps = {
  text: string;
};

const BackArrow: React.FC<BackArrowProps> = ({ text }) => {
  const router = useRouter();

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={styles.logoContainer} onPress={() => router.back()}>
        <Image
          source={icons.leftArrow}
          style={styles.arrowLogo}
          resizeMode='contain'
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
};

export default BackArrow;
