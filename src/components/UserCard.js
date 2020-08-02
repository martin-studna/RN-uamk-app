import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import colors from "../colors";
import Fire from "../Fire";
import firebase from "firebase";

const UserCard = (props) => {
  const [followStatus, setFollowStatus] = useState("Odebírat");
  const mounted = useRef();

  useEffect(() => {

    // Fire.shared.getFollowingByUserIdAsync(props.id).then((res) => {
    //   if (res.data()) {
    //     setFollowStatus("Odebírám");
    //   } else setFollowStatus("Odebírat");
    // });

  },[]);

  const followButtonAction = () => {
    console.log("follow");

    if (followStatus === "Odebírat") {
      Fire.shared
        .followUserByIdAsync(props.id)
        .then(() => setFollowStatus("Odebírám"));
    } else {
      Fire.shared
        .unfollowUserByIdAsync(props.id)
        .then(() => setFollowStatus("Odebírat"));
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigation.navigate("User", {uid: props.id})
      }
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Image
          style={styles.image}
          source={
            props.image
              ? { uri: props.image }
              : require("../assets/profile_image.png")
          }
        />
        <Text style={styles.username}>{props.username}</Text>
      </View>
      {/* <View style={{ flex: 1 }}></View>
      <TouchableOpacity
        style={styles.followButton}
        onPress={() => followButtonAction()}
      >
        <Text style={styles.followButtonText}>{followStatus}</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    padding: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    marginBottom: 7,

    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    color: colors.uamkBlue,
  },
  followButton: {
    backgroundColor: colors.uamkBlue,
    height: 37,
    width: 100,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  followButtonText: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default UserCard;
