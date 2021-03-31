// index.js
import { AppRegistry } from "react-native";
import messaging from "@react-native-firebase/messaging";
import App from "./src/App";
import app from "./app.json";
import React from "react";
import { registerRootComponent } from "expo";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn:
    "https://9a2c27f6a79446e6a4514b5b5b26c88a@o562448.ingest.sentry.io/5700993",
});

messaging()
  .subscribeToTopic("news")
  .then(() => console.log("Subscribed to topic!"));

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

registerRootComponent(HeadlessCheck);
