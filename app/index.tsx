// app/index.tsx
import React from 'react';
import { View, StyleSheet, Text, Button, Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import { Redirect } from 'expo-router';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { Stack } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

Amplify.configure(outputs);

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// function handleRegistrationError(errorMessage: string) {
//   alert(errorMessage);
//   throw new Error(errorMessage);
// }

// async function registerForPushNotificationsAsync() {
//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       handleRegistrationError('Permission not granted to get push token for push notification!');
//       return;
//     }
//     const projectId =
//       Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
//     if (!projectId) {
//       handleRegistrationError('Project ID not found');
//     }
//     try {
//       const pushTokenString = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data;
//       console.log(pushTokenString);
//       return pushTokenString;
//     } catch (e: unknown) {
//       handleRegistrationError(`${e}`);
//     }
//   } else {
//     handleRegistrationError('Must use physical device for push notifications');
//   }
// }

const Index = () => {

  const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState<Notifications.Notification | undefined>(
  //   undefined
  // );
  // const notificationListener = useRef<Notifications.Subscription>();
  // const responseListener = useRef<Notifications.Subscription>();

  // useEffect(() => {
  //   registerForPushNotificationsAsync()
  //     .then(token => setExpoPushToken(token ?? ''))
  //     .catch((error: any) => setExpoPushToken(`${error}`));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(notificationListener.current);
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ headerShown: false, autoHideHomeIndicator: true, animation: 'none' }}
      />
      <Redirect href={'/splash'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

registerRootComponent(Index);

export default Index;
