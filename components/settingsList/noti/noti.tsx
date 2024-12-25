import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, View, Text, Switch, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Stack, useRouter, Link } from 'expo-router';
import { COLORS, icons } from "../../../constants";
import styles from "../list.style";

const Noti = () => {
    const [isEnabledPush, setIsEnabledPush] = useState(false); // For Push Notifications
    const [isEnabledEmail, setIsEnabledEmail] = useState(false); // For Email Notifications (Placeholder, not implemented here)

    // Check if notifications are enabled on mount
    useEffect(() => {
        async function checkNotificationStatus() {
            const { status } = await Notifications.getPermissionsAsync();
            setIsEnabledPush(status === 'granted');
        }

        checkNotificationStatus();
    }, []);

    // Function to request or disable notifications
    const togglePushNotifications = async () => {
        if (isEnabledPush) {
            // If notifications are currently enabled, disable them
            Alert.alert(
                "Disable Notifications",
                "Are you sure you want to disable push notifications?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Yes",
                        onPress: async () => {
                            await Notifications.cancelAllScheduledNotificationsAsync();
                            setIsEnabledPush(false);
                            Alert.alert("Push notifications disabled");
                        }
                    }
                ]
            );
        } else {
            // If notifications are currently disabled, request permissions
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                setIsEnabledPush(true);
                Alert.alert("Push notifications enabled");
            } else {
                Alert.alert("Notifications permission not granted");
            }
        }
    };

    // Placeholder function for Email notifications toggle
    const toggleEmailNotifications = () => {
        setIsEnabledEmail(previousState => !previousState);
    };

    return (
        <View style={styles.container}>
            {/* Email Notifications (Placeholder)
            <TouchableOpacity style={{ ...styles.buttonContainer, backgroundColor: COLORS.secondary }}>
                <Image
                    source={icons.email}
                    resizeMode="contain"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Enable Email Notifications
                    </Text>
                    <Text style={styles.subText}>
                        We will keep you up to date on Deepwork
                    </Text>
                </View>
                <Switch
                    trackColor={{ false: '#767577', true: COLORS.green }}
                    thumbColor={isEnabledEmail ? COLORS.white : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleEmailNotifications}
                    style={styles.switch}
                    value={isEnabledEmail}
                />
            </TouchableOpacity> */}

            {/* Push Notifications */}
            <TouchableOpacity style={{ ...styles.buttonContainer, backgroundColor: COLORS.secondary }}>
                <Image
                    source={icons.noti}
                    resizeMode="contain"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>
                        Enable Push Notifications
                    </Text>
                    <Text style={styles.subText}>
                        We will remind you to stay focused!
                    </Text>
                </View>
                <Switch
                    trackColor={{ false: '#767577', true: COLORS.green }}
                    thumbColor={isEnabledPush ? COLORS.white : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={togglePushNotifications}
                    style={styles.switch}
                    value={isEnabledPush}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Noti;
