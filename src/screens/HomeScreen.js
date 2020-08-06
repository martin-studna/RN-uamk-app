import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors.js";
import MenuButton from "../components/MenuButton.js";
import Fire from "../Fire.js";

import PostCard from "../components/PostCard.js";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { NavigationEvents } from "react-navigation";
import Global from "../global.js";

const HomeScreen = (props) => {
  let onEndReachedCallDuringMomentum = false;

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [location, setLocation] = useState(null);
  const [semaphore, setSemaphore] = useState(false);

  const postsRef = Fire.shared.getPostsRef();

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("PERMISSION NOT GRANTED!");
      setErrorMessage("PERMISSION NOT GRANTED");
    }

    const userLocation = await Location.getCurrentPositionAsync();
    setLocation(userLocation);
  };

  const getPosts = async () => {
    setIsLoading(true);

    const snapshot = await postsRef.orderBy("timestamp", "desc").limit(5).get();


    if (!snapshot.empty) {
      let newPosts = [];

      //console.log(snapshot.docs[snapshot.docs.length - 1].data())
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        if (!snapshot.docs[i].data().text) continue;

        let time = getTime(snapshot.docs[i].data().timestamp);

        if (time >= 6) continue;

        newPosts.push(snapshot.docs[i].data());
      }

      setPosts(newPosts);
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
      //console.log(lastDoc.data())
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await postsRef
          .orderBy("timestamp", "desc")
          .startAfter(lastDoc.data().timestamp)
          .limit(5)
          .get();

        if (!snapshot.empty) {
          let newPosts = posts;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            if (!snapshot.docs[i].data().text) continue;

            let time = getTime(snapshot.docs[i].data().timestamp);

            if (time >= 6) continue;

            newPosts.push(snapshot.docs[i].data());
          }

          setPosts(newPosts);
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
      getPosts();
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

  const renderPost = (post) => {
    return (
      <PostCard
        timestamp={post.timestamp}
        text={post.text}
        image={post.image}
        difficulty={post.difficulty}
        type={post.type}
        publisher={post.publisher}
      />
    );
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const getDistance = (postLocation) => {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(postLocation.latitude - location.coords.latitude); // deg2rad below
    let dLon = deg2rad(postLocation.longitude - location.coords.longitude);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(location.coords.latitude)) *
        Math.cos(deg2rad(postLocation.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  };

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          getLocation();
          Global.postDescription = null;
          Global.postImage = null;
          Global.postDifficulty = null;
          getPosts();
        }}
      />
      <View style={styles.header}>
        <MenuButton navigation={props.navigation} style={styles.menu} />
        <Text style={styles.headerTitle}>ZÍRÁNÍM NEPOMŮŽEŠ</Text>
      </View>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/backgroundimage_zoom.png")}
      >
        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => renderPost(item)}
          keyExtractor={(item) => item.id}
          key={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          initialNumToRender={5}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ paddingBottom: 80}}
          onMomentumScrollBegin={() => {
            onEndReachedCallDuringMomentum = false;
          }}
          onEndReached={() => {
            if (!onEndReachedCallDuringMomentum && !isMoreLoading) {
              getMore();
            }
          }}
        />
      </ImageBackground>
      <View style={styles.menuButtonContainer}>
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => props.navigation.navigate("Menu")}
        >
          <Ionicons name="md-apps" size={23} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.mapButtonContainer}>
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => props.navigation.navigate("Map")}
        >
          <Ionicons name="md-map" size={23} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.difficultyButtonContainer}>
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => setSemaphore((val) => !val)}
        >
          <Image
            source={require("../assets/button_semafory_ipka.png")}
            style={{ width: 15, height: 25, resizeMode: "stretch" }}
          />
        </TouchableOpacity>
      </View>

      {semaphore ? (
        <View style={styles.greenLightButtonContainer}>
          <TouchableOpacity style={styles.fabButton}></TouchableOpacity>
        </View>
      ) : null}
      {semaphore ? (
        <View style={styles.orangeLightButtonContainer}>
          <TouchableOpacity style={styles.fabButton}></TouchableOpacity>
        </View>
      ) : null}
      {semaphore ? (
        <View style={styles.redLightButtonContainer}>
          <TouchableOpacity style={styles.fabButton}></TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  menu: {
    marginLeft: 42,
  },
  header: {
    height: 60,
    paddingLeft: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    borderBottomColor: "#EBECF4",
    borderBottomWidth: 1,
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
    flexDirection: "row",
  },
  headerTitle: {
    color: colors.uamkBlue,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 9,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  menuButtonContainer: {
    width: 55,
    height: 55,
    backgroundColor: colors.uamkBlue,
    position: "absolute",
    right: 10,
    bottom: 20,
    zIndex: 10,

    borderRadius: 50,
  },
  mapButtonContainer: {
    width: 55,
    height: 55,
    backgroundColor: colors.uamkBlue,
    position: "absolute",
    left: 10,
    bottom: 20,
    zIndex: 10,
    borderRadius: 50,
  },
  difficultyButtonContainer: {
    width: 55,
    height: 55,
    backgroundColor: colors.uamkBlue,
    position: "absolute",
    right: 10,
    top: 30,
    zIndex: 10,
    borderRadius: 50,
  },
  greenLightButtonContainer: {
    width: 45,
    height: 45,
    backgroundColor: "#5bd83d",
    position: "absolute",
    right: 15,
    top: 100,
    zIndex: 10,
    borderRadius: 50,
  },
  orangeLightButtonContainer: {
    width: 45,
    height: 45,
    backgroundColor: "#fcb000",
    position: "absolute",
    right: 15,
    top: 150,
    zIndex: 10,
    borderRadius: 50,
  },
  redLightButtonContainer: {
    width: 45,
    height: 45,
    backgroundColor: "#f84242",
    position: "absolute",
    right: 15,
    top: 200,
    zIndex: 10,
    borderRadius: 50,
  },
  fabButton: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
