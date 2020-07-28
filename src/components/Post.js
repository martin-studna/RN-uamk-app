import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import moment from "moment";
import colors from "../colors";

const Post = (props) => {
  const getDate = (timestamp) => {
    const currentDate = new Date();
    const passedTime = (currentDate.getTime() - timestamp) / 1000;

    if (passedTime < 60) return `${Math.floor(passedTime)} sekund`;
    if (passedTime / 60 < 60) return `${Math.floor(passedTime / 60)} min`;
    if (passedTime / (60 * 60) < 24)
      return `${Math.floor(passedTime / (60 * 60))} hod`;

    return `${Math.floor(passedTime / (60 * 60 * 24))} d`;
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
                source={require("../assets/profile_image.png")}
                style={{ borderRadius: 50, width: 50, height: 50 }}
              />
              <Text style={styles.timestamp}>{getDate(props.timestamp)}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold"}}>username</Text>
              <Image />
            </View>
          </View>

          <View style={styles.type}>
            <Image source={require("../assets/car_accident_icon.png")} />
          </View>
        </View>

        <Text style={styles.post}>{props.text}</Text>

        <Image
          source={{ uri: props.image }}
          style={styles.postImage}
          resizeMode="cover"
        />

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

export default Post;
