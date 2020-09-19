import React, {useState} from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from "react-native";
import ImageWrapper from "./ImageWrapper";
import YoutubePlayer from 'react-native-youtube-iframe';
import Global from '../global'
import { log } from "react-native-reanimated";
import Fire from '../Fire'


const VideoCard = (props) => {

  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [ended, setEnded] = useState(false)

  const addPoints = async () => {
    try {
      await Fire.shared.addPoints(10);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageWrapper
          source={require("../assets/prima.png")}
          style={{ resizeMode: "stretch", width: 50, height: 25 }}
          resizeMode="stretch"
        />
        <ImageWrapper
          source={require("../assets/book.png")}
          style={{ resizeMode: "stretch", width: 45, height: 45 }}
          resizeMode="stretch"
        />
      </View>
      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 10,
          color: "black",
          fontSize: 15,
        }}
      >
        {props.title}
      </Text>
      <View style={{ display: "flex", flexDirection: "column" }}>
      <View style={{height: 200 ,backgroundColor: ready ? "transparent" : "black", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10}}>
      {!ready ? <ActivityIndicator size="large"  style={{ zIndex: 10, position: 'absolute', top: "45%", left: "42%"}}/> : null}
        <YoutubePlayer
          height={"100%"}
          width={"100%"}
          videoId={props.videoId}
          play={playing}
          onChangeState={event => {console.log("event: ", event) 
            if (event === 'playing')
              setPlaying(true)
            if (event === 'ended') {
              addPoints()
              props.onEnded();
            }
          }}
          onReady={() => setReady(true)}
          onError={e => console.log(e)}
          onPlaybackQualityChange={q => console.log(q)}
          volume={50}
          playbackRate={1}
          initialPlayerParams={{
            cc_lang_pref: "us",
            showClosedCaptions: true
          }}
        />
        </View>
        <Text style={{ color: "black", width: "100%", marginLeft: 10 }}>
          {props.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 30,
    padding: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default VideoCard;
