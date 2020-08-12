import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert
} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors.js";
import Fire from "../Fire.js";
import NotificationCard from '../components/NotificationCard'
import { NavigationEvents } from "react-navigation";
import Global from "../global.js";

const NotificationsScreen = props => {

  let onEndReachedCallDuringMomentum = false;

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const postsRef = Fire.shared.getPostsRef()


  const getNotifications = async () => {
    setIsLoading(true);

    let snapshot = null

    try {
      snapshot = await postsRef.orderBy("timestamp", "desc").limit(5).get();
      
    } catch (error) {
      console.warn(error)
      setIsLoading(false)
      setIsMoreLoading(false)
      Alert.alert(
        "Bohužel došlo k chybě připojení se serverem.",
        'Žádáme Vás o strpení. Pracujeme na tom.',
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      return
    }

    if (!snapshot.empty) {
      let newNotifications = [];

      //console.log(snapshot.docs[snapshot.docs.length - 1].data())
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        
        if (snapshot.docs[i].data().publisher !== 'UAMK')
          continue
        
        if (!snapshot.docs[i].data().text) continue;

        let time = getTime(snapshot.docs[i].data().timestamp);

        if (time >= 6) continue;

        newNotifications.push(snapshot.docs[i].data());
      }

      setNotifications(newNotifications);
    } else {
      setLastDoc(null);
    }

    setIsLoading(false);
  };

  const getTime = (timestamp) => {
    const currentDate = new Date();
    let passedTime = (currentDate.getTime() - timestamp) / 1000;
    passedTime = Math.floor(passedTime / (60 * 60));
    return passedTime;
  };

  const getMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await postsRef
          .orderBy("timestamp", "desc")
          .startAfter(lastDoc.data().timestamp)
          .limit(5)
          .get();

        if (!snapshot.empty) {
          let newNotifications = notifications;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            if (!snapshot.docs[i].data().text) continue;

            if (snapshot.docs[i].data().publisher !== 'UAMK')
              continue

            let time = getTime(snapshot.docs[i].data().timestamp);

            if (time >= 6) continue;

            newNotifications.push(snapshot.docs[i].data());
          }

          setNotifications(newNotifications);
          if (snapshot.docs.length < 5) setLastDoc(null);
        } else {
          setLastDoc(null);
        }

        setIsMoreLoading(false);
      }, 1000);
    }

    onEndReachedCallDuringMomentum = false;
  };

  const onRefresh = () => {
    setTimeout(() => {
      getNotifications();
    }, 1000);
  };

  const renderFooter = () => {
    if (!isMoreLoading) return true;

    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{ marginBottom: 14 }}
      />
    );
  };

  const renderPost = (notification) => {
    return (
      <NotificationCard
        text={notification.text}
        timestamp={notification.timestamp}
        publisher={notification.publisher}
      />
    );
  };

  return (
    <View style={styles.container}>
    <NavigationEvents
          onWillFocus={() => {
            getNotifications()
          }}
        />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upozornění</Text>
      </View>

      <FlatList
          style={styles.feed}
          data={notifications}
          renderItem={({ item }) => renderPost(item)}
          key={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          initialNumToRender={5}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => {
            onEndReachedCallDuringMomentum = false;
          }}
          onEndReached={() => {
            if (!onEndReachedCallDuringMomentum && !isMoreLoading) {
              getMore();
            }
          }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    height: Platform.OS === 'android' ? 60 : 100,
    paddingLeft: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    flexDirection: "row",
    width: '100%'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.uamkBlue,
  },
  feed: {
    marginHorizontal: 16,
    width: "100%"
  },
});

export default NotificationsScreen;
