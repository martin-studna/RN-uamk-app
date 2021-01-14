import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";

class LocalNotificationService {
  configure(onOpenNotification) {
    PushNotification.configure({
      onRegister: function (token) {
        console.log("[LocalNotificationService] onRegister:", token);
      },
      onNotification: function (notification) {
        console.log("[LocalNotificationService] onNotification:", notification);
        if (!notification?.data) {
          return
        }

        notification.userInteraction = true
        onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data)

        // Only call callback if not from foreground
        if (platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  unregister() {
    PushNotification.unregister()
  }

  showNotification(id, title, message, data = {}, options = {}) {
    PushNotification.localNotification({
      ...this.buildAndroidNotification(id, title, message, data, options),
      ...this.buildIOSNotification(id, title, message, data, options),
      title: title || "",
      message: message || "",
      soundName: options.soundName || 'default',
      userInteraction: false
    })
  }

  buildAndroidNotification(id, title, message, data = {}, options = {}) {
    return {
      id,
      autoCancel: true, // (optional) default: true
      largeIcon: options.largeIcon || 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: options.smallIcon || 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: message || '', // (optional) default: "message" prop
      subText: title || '', // (optional) default: none
      vibrate: options.vibrate || true, // (optional) default: true
      vibration: options.vibration || 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      priority: options.priority || "high",
      importance: options.importance || "high",
      data: data
    }
  }

  buildIOSNotification(id, title, message, data = {}, options = {}) {
    return {
      alertAction: options.alertAction || 'view', // (optional) default: view
      category: options.category || '', // (optional) default: empty string
      userInfo: {
        id,
        item: data
      }
    }
  }

  cancelAllLocalNotifications() {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications()
    } else {
      PushNotificationIOS.removeAllPendingNotificationRequests()
    }
  }

  removeAllDeliveredNotificationByID(notificationId) {
    console.log("[LocalNotificationservice] removeDeliveredNotificationByID: ", notificationId);
    PushNotification.cancelLocalNotifications({id: `${notificationId}`})
  }
}

export const localNotificationService = new LocalNotificationService();