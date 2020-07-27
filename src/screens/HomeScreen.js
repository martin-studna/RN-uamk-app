import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  Icon
} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors.js";
import MenuButton from "../components/MenuButton.js";
import Fire from "../Fire.js";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = (props) => {
  let onEndReachedCallDuringMomentum = false;

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [posts, setPosts] = useState([]);

  const postsRef = Fire.shared.getPostsRef();

  useEffect(() => {
    const user = firebase.auth().currentUser;

    setEmail(user.email);
    setDisplayName(user.displayName);

    getPosts();
  }, []);

  const getPosts = async () => {
    setIsLoading(true);

    const snapshot = await postsRef.orderBy("timestamp").limit(3).get();

    if (!snapshot.empty) {
      let newPosts = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
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
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await postsRef
          .orderBy("timestamp")
          .startAfter(lastDoc.data().uid)
          .limit(3)
          .get();

        if (!snapshot.empty) {
          let newPosts = posts;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            newPosts.push(snapshot.docs[i].data());
          }

          setPosts(newPosts);
          if (snapshot.docs.length < 3) setLastDoc(null);
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
      <View style={styles.postContainer}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>

            <Ionicons
              style={styles.more}
              name="ios-more"
              size={24}
              color="#73788B"
            />
          </View>

          <Text style={styles.post}>{post.text}</Text>

          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMode="cover"
          />

          <View style={{ flexDirection: "row" }}></View>
        </View>
        
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
          initialNumToRender={3}
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
        <TouchableOpacity style={styles.menuButton} onPress={() => props.navigation.navigate('Menu')}>
            <Ionicons name='md-apps' size={23} color="#fff" />
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
  postContainer: {
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 22,
  },
  post: {
    marginLeft: 16,
    marginRight: 16,
    fontSize: 14,
    color: "#838899",
  },
  timestamp: {
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 16,
  },
  more: {
    marginRight: 16,
  },
  postImage: {
    width: "100%",
    height: 150,
    marginVertical: 16,
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
  menuButton: {
    width: '100%',
    height: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
  }
});

export default HomeScreen;
