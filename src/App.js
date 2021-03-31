import React from "react";
import { YellowBox, Alert } from "react-native";
import firebaseConfig from "./config";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoadingScreen from "./screens/LoadingScreen";
import * as firebase from "firebase";
import colors from "./colors.js";
import DrawerNavigator from "./navigation/DrawerNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import AppStackNavigator from "./navigation/AppStackNavigator";
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import NotifService from "../NotifService";
import { fcmService } from "../FCMService";
import { localNotificationService } from "../LocalNotificationService";

console.disableYellowBox = true;

YellowBox.ignoreWarnings(["Setting a timer"]);

const Container = createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStackNavigator,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: "Loading",
    }
  )
);

const App = () => {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log("[App] onRegister: ", token);
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify);
      const options = {
        soundName: "default",
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      );
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify);
      alert("Open Notification: ", notify.body);
    }

    return () => {
      console.log("[App] unRegister");
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  return <Container />;
};

export default App;
