import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import styles from './message.style';
import { icons } from '../../../constants';

const Message = () => {
    return(
        <View style={styles.container}> 
        <Text style={styles.mainText}>Welcome Back, </Text>
        <Text style={styles.mainText}>Let's Sign In!</Text>
        <View style = {{ marginTop: 5}}> 
        <Text style={styles.secondaryText} >Let's turn your goals into reality with Deepwork.</Text>
        </View>
        </View>
    )
}
export default Message;