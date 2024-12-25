// components/notifications/xpEarned/xpEarned.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './xpEarned.styles';
import { icons } from '../../../constants';

const XpEarned = ({ xp, timeAgo }) => {
  return (
    <View style={styles.container}>
      <Image source={icons.trophy} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>XP Earned</Text>
        <Text style={styles.subtitle}>+{xp}xp From Last Weeks Average</Text>
      </View>
      <Text style={styles.time}>{timeAgo}</Text>
    </View>
  );
};

export default XpEarned;
