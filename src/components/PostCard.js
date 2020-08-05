import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../colors";
import Fire from "../Fire";

const PostCard = (props) => {
  const [publisher, setPublisher] = useState("");
  const [publisherImage, setPublisherImage] = useState(null);

  useEffect(() => {
    Fire.shared.getUserByIdAsync(props.publisher).then((res) => {
      //console.log("GET POST USER DATA: ", res.data());
      setPublisher(res.data().username);
      setPublisherImage(res.data().image);
    });
  }, []);

  const getDate = (timestamp) => {
    const currentDate = new Date();
    const passedTime = (currentDate.getTime() - timestamp) / 1000;

    if (passedTime < 60) return 'Právě teď';
    if (passedTime / 60 < 60) return `${Math.floor(passedTime / 60)} min`;
    if (passedTime / (60 * 60) < 24)
      return `${Math.floor(passedTime / (60 * 60))} hod`;

    return `${Math.floor(passedTime / (60 * 60 * 24))} d`;
  };

  const setTypeImage = () => {
    switch (props.type) {
      case "car_accident":
        return require("../assets/car_accident_icon.png");
        break;
      case "traffic_jam":
        return require("../assets/traffic_jam_icon.png");
        break;
      case "traffic_closure":
        return require("../assets/traffic_closure_icon.png");
        break;
      case "danger":
        return require("../assets/danger_icon.png");
        break;
      default:
        return require("../assets/car_accident_icon.png");
        break;
    }
  };

  const setDifficultyImage = () => {
    switch (props.difficulty) {
      case "easy":
        return require('../assets/semafory_green.png')
        break;
      case "medium":
        return require('../assets/semafory_orange.png')
        break;
      case "hard":
        return require('../assets/semafory_red.png')
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.postContainer}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ margin: 20, flexDirection: "row" }}>
            <View>
              <Image
                source={
                  publisherImage
                    ? { uri: publisherImage }
                    : require("../assets/profile_image.png")
                }
                style={{ borderRadius: 50, width: 50, height: 50 }}
              />
              <Text style={styles.timestamp}>{getDate(props.timestamp)}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                {publisher}
              </Text>
              <Image source={setDifficultyImage()} style={{ marginLeft: 8, marginTop: 4, width: 60, height: 20, resizeMode: 'stretch'}}/>
            </View>
          </View>

          <View style={styles.type}>
            <Image source={setTypeImage()} style={{ width: 25, height: 25 }} />
          </View>
        </View>

        { props.text ? <Text style={styles.post}>{props.text}</Text> : null }

        {props.image ? (
          <Image
            source={{ uri: props.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
        ) : null}

        <View style={{ flexDirection: "row" }}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 15,
  },
  timestamp: {
    marginTop: 8,
    marginLeft: 2,
    fontWeight: "bold",
    color: "#838899",
    fontSize: 12,
    textAlign: "center",
  },
  more: {
    display: "none",
    marginRight: 16,
  },
  postImage: {
    width: "100%",
    height: 175,
    marginVertical: 16,
  },
  type: {
    borderRadius: 100,
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginRight: 15,
  },
});

export default PostCard;
