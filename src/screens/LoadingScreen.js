import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, Image } from "react-native";
import * as firebase from "firebase";
import AsyncStorage from '@react-native-community/async-storage';

const LoadingScreen = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {

      AsyncStorage.getItem('aboutFirst').then(shown => {

        if (!shown) {
          if (user)
            AsyncStorage.setItem('aboutFirst', 'true').then(() => props.navigation.navigate('AboutFirst')) 
        }
        else {
          props.navigation.navigate(user ? "App" : "Auth");
        }

      })

    });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/backgroundimage_zoom.png")}>

        <Image  source={require('../assets/zirani_logo_circle.png')} style={styles.logo}/>

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
    flex: 1
  },
  logo: { 
    width: 200,
    height: 200
  }
});

export default LoadingScreen;
