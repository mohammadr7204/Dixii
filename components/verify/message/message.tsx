import styles from '../../forgotPassword/message/message.style';
import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';

const Message = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.bigText}>Enter your Verification Code</Text>
            <Text style={styles.smallText} >A code was sent to your email inbox.</Text>
            
        </View>
    )
}
export default Message;