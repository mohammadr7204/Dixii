import { COLORS, SIZES, FONT } from "../../../constants";
import { icons } from '../../../constants';
import { images } from '../../../constants';
import React, { useState, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput, Alert, TouchableOpacityComponent, Switch } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import styles from "../list.style";

const Devices = () => {
    const [deviceName, setDeviceName] = useState('User\'s Niura Earbuds #1');
    const [isConfirmed, setIsConfirmed] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    const [isUpdated, setIsUpdated] = useState(true)
    const textInputRef = useRef(null);

    useEffect(() => {
        if (!isConfirmed) {
            textInputRef.current?.focus();
        }
    }, [isConfirmed]);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                {isConfirmed ? (
                    <Text style={{ ...styles.mainText, textAlign: 'center' }}>
                        {deviceName}
                    </Text>
                ) : (
                    <TextInput
                        ref={textInputRef}
                        style={{ ...styles.mainText, textAlign: 'center' }}
                        placeholder="Enter new name"
                        placeholderTextColor={COLORS.gray}
                        onChangeText={(text) => setDeviceName(text)}
                        onSubmitEditing={() => setIsConfirmed(true)}
                    />
                )}
                <TouchableOpacity onPress={() => { setIsConfirmed(false) }}>
                    <Image
                        source={icons.pencil}
                        resizeMode="contain"
                        style={{ height: 20, width: 20, tintColor: COLORS.white, marginLeft: 8, marginTop: 2 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                <Image
                    source={icons.earbudLeft}
                    resizeMode="contain"
                    style={{ height: 80, width: 80 }}
                />
                <Image
                    source={icons.earbudRight}
                    resizeMode="contain"
                    style={{ height: 80, width: 80 }}
                />
            </View>
            <Image
                source={icons.earbudCase}
                resizeMode="contain"
                style={{ height: 160, width: 160, alignSelf: 'center', marginTop: -20 }}
            />
            {isConnected && (
            <TouchableOpacity style={styles.signOutButton} onPress={() => setIsConnected(false)}>
                <Text style={styles.signOutText}>Disconnect</Text>
            </TouchableOpacity>
            )}
            {!isConnected && (
            <TouchableOpacity style={styles.signOutButton} onPress={() => setIsConnected(true)}>
                <Text style={styles.signOutText}>Connect</Text>
            </TouchableOpacity>
            )}
            {isUpdated && (
                <View style={{...styles.signOutButton, marginTop: 250}} >
                <Text style={{...styles.signOutText, color: COLORS.white}}> Firmware is up to date</Text>
            </View>
            )}
            {!isUpdated && (
            <TouchableOpacity style={{...styles.signOutButton, marginTop: 250}} onPress={() => setIsUpdated(true)}>
                <Text style={{...styles.signOutText, color: COLORS.white}}>Update Firmware</Text>
            </TouchableOpacity>
            )}
        </View >
    );
};

export default Devices;
