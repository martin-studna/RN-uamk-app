// index.js
import { AppRegistry } from "react-native";
import messaging from "@react-native-firebase/messaging";
import App from "./src/App";
import app from "./app.json";
import React from "react";
import { registerRootComponent } from "expo";

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
