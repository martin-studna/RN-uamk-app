import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors.js";
import MenuButton from "../components/MenuButton.js";
import Fire from "../Fire.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import PostCard from "../components/PostCard.js";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { NavigationEvents } from "react-navigation";
import Global from "../global.js";

const HomeScreen = (props) => {
  let onEndReachedCallDuringMomentum = false;

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [location, setLocation] = useState(null);

  const postsRef = Fire.shared.getPostsRef();


  useEffect(() => {
    const user = firebase.auth().currentUser;

    setEmail(user.email);
    setDisplayName(user.displayName);

    //getPosts();
    getLocation();
  }, []);

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("PERMISSION NOT GRANTED!");
      setErrorMessage("PERMISSION NOT GRANTED");
    }

    const userLocation = await Location.getCurrentPositionAsync();
    console.log(userLocation);
    setLocation(userLocation);
  };

  const getPosts = async () => {
    setIsLoading(true);

    const snapshot = await postsRef.orderBy("timestamp", "desc").limit(5).get();

    if (!snapshot.empty) {
      let newPosts = [];

      console.log(snapshot.docs[snapshot.docs.length - 1].data())
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {

        if(!snapshot.docs[i].data().text)
          continue;

        newPosts.push(snapshot.docs[i].data());
      }

      setPosts(newPosts);
    } else {
      setLastDoc(null);
    }

    setIsLoading(false);
  };

  const getMore = async () => {
    if (lastDoc) {
      console.log(lastDoc.data())
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await postsRef
          .orderBy("timestamp", 'desc')
          .startAfter(lastDoc.data().timestamp)
          .limit(5)
          .get();

        if (!snapshot.empty) {
          let newPosts = posts;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {

            if(!snapshot.docs[i].data().text)
              continue;

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
        color={"#D83E64"}
        style={{ marginBottom: 10 }}
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

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          Global.postDescription = null
          Global.postImage = null
          Global.postDifficulty = null
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
    height: 80,
    paddingLeft: 16,
    paddingTop: 20,
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
    right: 10,
    top: 50,
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
