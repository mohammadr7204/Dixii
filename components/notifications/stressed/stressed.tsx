// components/notifications/stressed/stressed.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './stressed.styles';
import { icons } from '../../../constants';

const Stressed = ({ xp }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={icons.brain} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Looks like you’re getting stressed</Text>
          <Text style={styles.subtitle}>Earn {xp}xp</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>Start Breathing Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>No Thanks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Stressed;
