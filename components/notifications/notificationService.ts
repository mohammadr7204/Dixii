export async function sendPushNotification(expoPushToken: string) {
    const message = {
      token: expoPushToken,
      title: 'New Notification',
      body: 'This is a test notification!',
    };
  
    try {
      const response = await fetch('http://<IPADDRESS>:3000/send-notification', { // Replace with your local IP
        method: 'POST',  // Ensure the request is a POST request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
  
      const data = await response.json();
      console.log('Notification response: ', data);
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  }





//   import { sendPushNotification } from '../components/notifications/notificationService';
//   import * as Notifications from 'expo-notifications';
//   import * as Device from 'expo-device';
//   import Constants from 'expo-constants';


//   let expoPushToken;

//   useEffect(() => {
//       // Register for push notifications and get the token
//       async function registerForPushNotificationsAsync() {
//           if (Device.isDevice) {
//               const { status: existingStatus } = await Notifications.getPermissionsAsync();
//               let finalStatus = existingStatus;
//               if (existingStatus !== 'granted') {
//                   const { status } = await Notifications.requestPermissionsAsync();
//                   finalStatus = status;
//               }
//               if (finalStatus !== 'granted') {
//                   alert('Failed to get push token for push notification!');
//                   return;
//               }
//               const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
//               const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
//               expoPushToken = token;
//           } else {
//               alert('Must use physical device for Push Notifications');
//           }
//       }

//       registerForPushNotificationsAsync();
//   }, []);

//   useEffect(() => {
//       const timeoutId = setTimeout(() => {
//         console.log('10 seconds have passed, executing the effect');
//         console.log(expoPushToken)
//         sendPushNotification(expoPushToken); // You can call any function here
//       }, 10000); // Delay of 10 seconds
    
//       // Cleanup the timeout if the component unmounts before the 10 seconds
//       return () => clearTimeout(timeoutId);
//     }, []); // The empty dependency array ensures this runs once when the component mounts
  