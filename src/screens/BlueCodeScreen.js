import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import colors from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { NavigationEvents } from "react-navigation";

const BlueCodeScreen = (props) => {
  let onEndReachedCallDuringMomentum = false;

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastVid, setLastVid] = useState(null);
  const [videos, setVideos] = useState([]);

  const YOUTUBE_API_KEY = 'AIzaSyCfDyk81Girkru2oVdLZYfciLwAy03jXlM'
  const YOUTUBE_CHANNEL_ID = 'UCUOhEDlRYWqHUAGkyjz1zaA'

  const youtube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
  });

  const getVideos = async () => {
    setIsLoading(true);

    let snapshot = null

    try {
      snapshot = await youtube.get(
        `/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`);
      
    } catch (error) {
      console.warn(error)
      Alert.alert(
        "Omlouváme se.",
        'Momentálně jsou videa Modrého kódu nedostupná.',
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      return
    }


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
    <NavigationEvents 
      onWillFocus={() => {
        getVideos()
      }}
    />
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
          keyExtractor={(item) => item.videoId}
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
    height: Platform.OS === 'android' ? 60 : 100,
    paddingLeft: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    flexDirection: "row",
    width: '100%'
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
