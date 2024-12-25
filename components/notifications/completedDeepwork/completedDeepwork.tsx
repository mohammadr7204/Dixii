// components/notifications/completedDeepwork/completedDeepwork.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './completedDeepwork.styles';
import { icons } from '../../../constants';

const CompletedDeepwork = ({ xp, timeAgo }) => {
  return (
    <View style={styles.container}>
      <Image source={icons.completed} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Completed</Text>
        <Text style={styles.subtitle}>+{xp}xp Earned</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.time}>{timeAgo}</Text>
        <Image source={icons.share} style={styles.shareIcon} />
      </View>
    </View>
  );
};

export default CompletedDeepwork;
