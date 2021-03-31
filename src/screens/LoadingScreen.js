import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";

const LoadingScreen = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      try {
        await AsyncStorage.getItem("aboutFirst").then(async (shown) => {
          if (!shown) {
            if (user)
              await AsyncStorage.setItem("aboutFirst", "true").then(() =>
                props.navigation.navigate("AboutFirst")
              );
            else props.navigation.navigate(user ? "App" : "Auth");
          } else {
            props.navigation.navigate(user ? "App" : "Auth");
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/backgroundimage_zoom.png")}
      >
        <Image source={require("../assets/logoZN.png")} style={styles.logo} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default LoadingScreen;
