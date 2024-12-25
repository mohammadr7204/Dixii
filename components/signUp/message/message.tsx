import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import styles from './message.style';
import { icons } from '../../../constants';

const Message = () => {
    return (
        <View style = { styles.container}> 
            <Text style = { styles.mainText}> 
                Welcome,{"\n"}Let's Sign Up!
            </Text>
            {/* <Text style = {styles.mainText}>
                Let's Sign Up!
            </Text> */}
            <View style={{ marginTop: 5 }}>
                <Text style={styles.secondaryText} >
                       Let's start with your email.
                    </Text>
                
            </View>


        </View>
    )
}
export default Message;