import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  RefreshControl,
  FlatList,
  ActivityIndicator
} from "react-native";
import colors from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import VideoCard from "../components/VideoCard";

const BlueCodeScreen = (props) => {
  let onEndReachedCallDuringMomentum = false;

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastVid, setLastVid] = useState(null);
  const [videos, setVideos] = useState([]);

  const YOUTUBE_API_KEY = 'AIzaSyAoYtb3-0wpYChxtlp9pLY4nRxXVWTqzZQ'
  const YOUTUBE_CHANNEL_ID = 'UCUOhEDlRYWqHUAGkyjz1zaA'

  const youtube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
  });

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setIsLoading(true);

    const snapshot = await youtube.get(
      `/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`);

    console.log('YOUTUBE DATA: ' ,snapshot)

    if (snapshot.data.items.length !== 0) {
      let newVideos = [];

      setLastVid(snapshot.data.items[snapshot.data.items.length - 1]);

      for (let i = 0; i < snapshot.data.items.length; i++) {
        const videoId = snapshot.data.items[i].id.videoId 
        const newVideo = { videoId, ...snapshot.data.items[i].snippet}
        newVideos.push(newVideo);
      }

      console.log("BLUE CODE VIDEOS: ", newVideos);

      setVideos(newVideos);
    } else {
      setLastVid(null);
    }

    setIsLoading(false);
  };

  // const getMore = async () => {
  //   if (lastDoc) {
  //     setIsMoreLoading(true);

  //     setTimeout(async () => {
  //       let snapshot = await postsRef
  //         .orderBy("timestamp")
  //         .startAfter(lastDoc.data().uid)
  //         .limit(3)
  //         .get();

  //       if (!snapshot.empty) {
  //         let newPosts = posts;

  //         setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

  //         for (let i = 0; i < snapshot.docs.length; i++) {
  //           newPosts.push(snapshot.docs[i].data());
  //         }

  //         setPosts(newPosts);
  //         if (snapshot.docs.length < 3) setLastDoc(null);
  //       } else {
  //         setLastDoc(null);
  //       }

  //       setIsMoreLoading(false);
  //     }, 1000);
  //   }

  //   onEndReachedCallDuringMomentum = false;
  // };

  const onRefresh = () => {
    setTimeout(() => {
      getVideos();
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

  const renderVideo = (video) => {
    return (
      <VideoCard
        medium={video.thumbnails.medium}
        title={video.title}
        videoId={video.videoId}
        description={video.description}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={32} color={colors.uamkBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modrý kód</Text>
      </View>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/backgroundimage_zoom.png")}
      >
        <FlatList
          style={styles.feed}
          data={videos}
          renderItem={({ item }) => renderVideo(item)}
          key={(item) => item.videoId}
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
              //getMore();
            }
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    height: 80,
    width: "100%",
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
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
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
});

export default BlueCodeScreen;
