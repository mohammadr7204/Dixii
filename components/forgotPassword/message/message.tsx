import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import styles from './message.style';
import { icons } from '../../../constants';

const Message = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.bigText}>Forgot Password? </Text>
            <Text style={styles.smallText} >Please Enter the email associated with your account.</Text>
        </View>
    )
}
export default Message;