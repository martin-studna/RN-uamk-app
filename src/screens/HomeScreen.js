import React, { useState, useEffect, useCallback } from "react";
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
  Platform,
  Alert,
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
  const [difficulty, setDifficulty] = useState(null);
  const [mount, setMount] = useState(false);
  const [followings, setFollowings] = useState([]);

  const postsRef = Fire.shared.getPostsRef();

  useEffect(() => {
    if (mount) {
      getPosts();
    } else setMount(true);
  }, [difficulty, location, followings]);

  const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("PERMISSION NOT GRANTED!");
      setErrorMessage("PERMISSION NOT GRANTED");
    }

    try {
      const userLocation = await Location.getCurrentPositionAsync();
      setLocation(userLocation);
    } catch (error) {
      console.warn(error);
      return
    }
  };

  const getPosts = async () => {
    setIsLoading(true);

    let snapshot = null;
    try {
      let timeRange = new Date();
      timeRange.setHours(timeRange.getHours() - 6);

      if (semaphore && difficulty) {
        snapshot = await postsRef
          .where("timestamp", ">=", timeRange.getTime())
          .where('difficulty', '==', difficulty)
          .orderBy("timestamp", "desc")
          .limit(5)
          .get();

          console.log(snapshot.docs.length);
      }
      else {
        snapshot = await postsRef
          .where("timestamp", ">=", timeRange.getTime())
          .orderBy("timestamp", "desc")
          .limit(5)
          .get();
      }

    } catch (error) {
      console.warn(error);
      setIsLoading(false);
      setIsMoreLoading(false);
      Alert.alert(
        "Omlouváme se.",
        'Momentálně jsou příspěvky o dopravní situaci nedostupné.',
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      return;
    }

    if (!snapshot.empty) {
      let newPosts = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      for (let i = 0; i < snapshot.docs.length; i++) {
        if (!validPost(snapshot.docs[i].data())) continue;

        newPosts.push(snapshot.docs[i]);
      }

      setPosts(newPosts);
    } else {
      setPosts([])
      setLastDoc(null);
    }

    setIsLoading(false);
  };

  const getMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = null;
        try {
          let timeRange = new Date();
          timeRange.setHours(timeRange.getHours() - 6);

          if (semaphore && difficulty) {
            snapshot = await postsRef
              .where("timestamp", ">=", timeRange.getTime())
              .where('difficulty', '==', difficulty)
              .orderBy("timestamp", "desc")
              .startAfter(lastDoc.data().timestamp)
              .limit(5)
              .get();
          }
          else {
            snapshot = await postsRef
              .where("timestamp", ">=", timeRange.getTime())
              .orderBy("timestamp", "desc")
              .startAfter(lastDoc.data().timestamp)
              .limit(5)
              .get();
          }

        } catch (error) {
          console.warn(error);
          setIsLoading(false);
          setIsMoreLoading(false);
          return
        }

        if (!snapshot.empty) {

          if (snapshot.docs[snapshot.docs.length - 1].id !== lastDoc.id) {
            setIsMoreLoading(false)
            return
          }

          let newPosts = posts;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            if (!validPost(snapshot.docs[i].data())) continue;

            newPosts.push(snapshot.docs[i]);
          }

          console.log(newPosts.length);

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

  const renderPost = useCallback(({ item }) => {
    return (
      <PostCard
        timestamp={item.data().timestamp}
        text={item.data().text}
        image={item.data().image}
        difficulty={item.data().difficulty}
        type={item.data().type}
        publisher={item.data().publisher}
      />
    );
  }, []);

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

  const toggleFilter = () => {
    const showSemaphore = !semaphore;
    setSemaphore((val) => !val);

    if (!showSemaphore) {
      setDifficulty(null);
    }
  };

  const filterByDifficulty = (difficulty) => {
    setDifficulty(difficulty);
  };

  const validPost = (post) => {
    let distance = getDistance(post.location);

    if (!post.text && !post.image) return false;

    for (let i = 0; i < followings.length; i++) {
      if (
        post.publisher === followings[i].id ||
        post.publisher === firebase.auth().currentUser.uid
      ) {
        return true;
      } else return false;
    }

    if (distance < Global.radius) {
      return true;
    } 

    return false;
  };

  const componentWillMount = async () => {
    let result = null;
    try {
      result = await Fire.shared.getFollowingByUserIdAsync(
        firebase.auth().currentUser.uid
      );
      getLocation();
      setFollowings(result.docs);
      Global.postDescription = null;
      Global.postImage = null;
      Global.postDifficulty = null;
      setDifficulty(null);
    } catch (error) {
      if (error.code === "resource-exhausted") console.log("true");

      console.warn(error.name);
      console.warn(error.code);
      console.warn(error.message);
      return
    }
  };

  /**
   * Arrow functions defined in Flatlist component are being created on each render. This makes application significantly slower.
   * We are trying to prevent this behaviour by defining these function outside of the return statement
   */

  const keyExtractor = useCallback((item) => item.id, []);
  const filterEasy = () => filterByDifficulty("easy");
  const filterMedium = () => filterByDifficulty("medium");
  const filterHard = () => filterByDifficulty("hard");

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          componentWillMount();
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
          renderItem={renderPost}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          maxToRenderPerBatch={7}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          initialNumToRender={5}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ paddingBottom: 80 }}
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
        <TouchableOpacity style={styles.fabButton} onPress={toggleFilter}>
          <Image
            source={require("../assets/button_semafory_ipka.png")}
            style={{ width: 15, height: 25, resizeMode: "stretch" }}
          />
        </TouchableOpacity>
      </View>

      {semaphore ? (
        <TouchableOpacity
          style={styles.greenLightButtonContainer}
          onPress={filterEasy}
        ></TouchableOpacity>
      ) : null}
      {semaphore ? (
        <TouchableOpacity
          style={styles.orangeLightButtonContainer}
          onPress={filterMedium}
        ></TouchableOpacity>
      ) : null}
      {semaphore ? (
        <TouchableOpacity
          style={styles.redLightButtonContainer}
          onPress={filterHard}
        ></TouchableOpacity>
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
    height: Platform.OS === "android" ? 60 : 100,
    paddingLeft: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
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
    top: Platform.OS === "android" ? 30 : 75,
    zIndex: 10,
    borderRadius: 50,
  },
  greenLightButtonContainer: {
    width: 45,
    height: 45,
    backgroundColor: "#5bd83d",
    position: "absolute",
    right: 15,
    top: Platform.OS === "android" ? 100 : 155,
    zIndex: 10,
    borderRadius: 50,
  },
  orangeLightButtonContainer: {
    width: 45,
    height: 45,
    backgroundColor: "#fcb000",
    position: "absolute",
    right: 15,
    top: Platform.OS === "android" ? 150 : 205,
    zIndex: 10,
    borderRadius: 50,
  },
  redLightButtonContainer: {
    width: 45,
    height: 45,
    backgroundColor: "#f84242",
    position: "absolute",
    right: 15,
    top: Platform.OS === "android" ? 200 : 255,
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
