import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import styles from './logo.style';
import { icons } from '../../../constants';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image
                source={icons.brain}
                resizeMode='contain'
                style={styles.brainLogo}
                />
            <Text style= {styles.logoText}> Deepwork </Text>

        </View>
    )
}
export default Logo;
