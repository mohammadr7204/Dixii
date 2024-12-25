import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { images } from '../../../constants';
import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert, Switch } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import styles from "../list.style";
import Slider from '@react-native-community/slider';

const Devset = () => {
  const [volume, setVolume] = useState(0.5);
  const [selectedNoiseCancellation, setSelectedNoiseCancellation] = useState('Off');

  const noiseCancellationOptions = [
    { label: 'Off', icon: icons.nosound },
    { label: 'Min', icon: icons.sound },
    { label: 'Max', icon: icons.maxsound },
  ];

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.mainText, textAlign: 'left', marginTop: 30 }}>Volume Control Level: {Math.round(volume * 100)}%</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onValueChange={(value) => setVolume(value)}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.white}
        thumbTintColor="#b9e4c9"
      />
      <Text style={{ ...styles.mainText, marginTop: 20 }}>
        Noise Cancellation
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        {noiseCancellationOptions.map(option => (
          <TouchableOpacity
            key={option.label}
            style={{
              backgroundColor: COLORS.gray5,
              borderRadius: 12,
              flexDirection: 'column',
              flex: 1,
              marginHorizontal: 10,
              borderColor: selectedNoiseCancellation === option.label ? COLORS.primary : 'transparent',
              borderWidth: selectedNoiseCancellation === option.label ? 1 : 0,
            }}
            onPress={() => setSelectedNoiseCancellation(option.label)}
          >
            <Image
              source={option.icon}
              resizeMode="contain"
              style={{ height: 25, width: 25, tintColor: COLORS.white, alignSelf: 'center' }}
            />
            <Text style={{ ...styles.mainText, textAlign: 'center' }}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default Devset;