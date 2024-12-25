const express = require('express');
const bodyParser = require('body-parser');
const { Expo } = require('expo-server-sdk');

const app = express();
const expo = new Expo();

app.use(bodyParser.json());

// Handle POST request for sending notification
app.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  // Check if token is valid
  if (!Expo.isExpoPushToken(token)) {
    return res.status(400).send({ error: 'Invalid Expo push token' });
  }

  // Prepare notification message
  const messages = [{
    to: token,
    sound: 'default',
    title: title,
    body: body,
    data: { withSome: 'data' },
  }];

  try {
    // Send the notification
    let tickets = await expo.sendPushNotificationsAsync(messages);
    console.log(tickets);
    res.status(200).send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to send notification' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
