import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";

class FCMService {
  register(onRegister, onNotification, onOpenNotification) {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification
    );
  }

  async registerAppWithFCM() {
    if (Platform.OS === "ios") {
      try {
        await messaging().registerDeviceForRemoteMessages();
        await messaging().setAutoInitEnabled(true);
      } catch (error) {
        console.log("[FCMService] Register app with FCM has failed: ", error);
      }
    }
  }

  async checkPermission(onRegister) {
    try {
      const enabled = await messaging().hasPermission();
      if (enabled) {
        // User has permissions
        this.getToken(onRegister);
      } else {
        // User doesn't have permission
        this.requestPermission(onRegister);
      }
    } catch (error) {
      console.log("[FCMService] Permission rejected", error);
    }
  }

  async getToken(onRegister) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        onRegister(fcmToken);
      } else {
        console.log("[FCMService] User does not have a device token");
      }
    } catch (error) {
      console.log("[FCMService] getToken rejected", error);
    }
  }

  async requestPermission(onRegister) {
    try {
      await messaging().requestPermission();
      this.getToken(onRegister);
    } catch (error) {
      console.log("[FCMService] Request Permission rejected", error);
    }
  }

  async deleteToken() {
    console.log("[FCMService] deleteToken");
    try {
      await messaging().deleteToken();
    } catch (error) {
      console.log("[FCMService] Delete token error", error);
    }
  }

  async createNotificationListeners(
    onRegister,
    onNotification,
    onOpenNotification
  ) {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "[FCMService] onNotificationOpenedApp Notification caused app to open"
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });

    // When the application is opened from a quit state.
    const remoteMessage = await messaging().getInitialNotification();
    console.log(
      "[FCMService] getInitialNotification Notification caused app to open"
    );
    if (remoteMessage) {
      const notification = remoteMessage.notification;
      onOpenNotification(notification);
    }

    // Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log("[FCMService] A new FCM message arrived!", remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === "ios") {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      console.log("[FCMService] New token refresh: ", fcmToken);
      onRegister(fcmToken);
    });
  }

  unRegister() {
    this.messageListener();
  }
}

export const fcmService = new FCMService();
