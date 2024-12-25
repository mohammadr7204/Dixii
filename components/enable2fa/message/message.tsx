import styles from '../../forgotPassword/message/message.style';
import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';

const Message = () => {
    return (
        <View style={styles.container}>
            <Text style={{...styles.bigText, marginTop: -50}}>Please Enter Your Phone Number</Text>
            <Text style={styles.smallText} >Add another level of security to your phone.</Text>
            
        </View>
    )
}
export default Message;