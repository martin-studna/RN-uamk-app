import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Fire from "../Fire";
import { getDistance } from "geolib";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import ImageWrapper from "../components/ImageWrapper";
import firebase from "firebase";
import Global from "../global";
import { NavigationEvents } from "react-navigation";

const MapScreen = (props) => {
  const [location, setLocation] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
    },
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [followings, setFollowings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const postsRef = Fire.shared.getPostsRef();

  useEffect(() => {
    getPosts()
  }, [location])

  const loadData = async () => {
    setLoading(true);
    try {
      await getLocation();
      const result = await Fire.shared.getFollowingByUserIdAsync(
        firebase.auth().currentUser.uid
      );
      setFollowings(result.docs);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  const getPosts = async () => {
    let timeRange = new Date();
    timeRange.setHours(timeRange.getHours() - 6);

    const snapshot = await postsRef.where("timestamp", ">=", timeRange.getTime()).get();
    if (!snapshot.empty) {
      let newPosts = [];

      for (let i = 0; i < snapshot.docs.length; i++) {
        if (!validPost(snapshot.docs[i].data())) continue;

        newPosts.push(snapshot.docs[i].data());
      }

      console.log(newPosts);
      setPosts(newPosts);
    }
  };

  const validPost = (post) => {
    console.log(location.coords);
    let distance =
      getDistance(
        {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        },
        { longitude: post.location.longitude, latitude: post.location.latitude }
      ) / 1000;

      console.log('Distance: ', distance);
      console.log('Radius: ',Global.radius)
  
    if (distance < Global.radius) {
      return true;
    }

    for (let i = 0; i < followings.length; i++) {
      if (
        post.publisher === followings[i].id ||
        post.publisher === firebase.auth().currentUser.uid ||
        post.publisher === "UAMK"
      ) {
        return true;
      } else return false;
    }


    return false;
  };


  const setTypeImage = (type) => {
    switch (type) {
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

  const setTitle = (type) => {
    switch (type) {
      case "car_accident":
        return "Dopravní nehoda";
        break;
      case "traffic_jam":
        return "Dopravní zácpa";
        break;
      case "traffic_closure":
        return "Dopravní uzavírka";
        break;
      case "danger":
        return "Dopravní nebezpečí";
        break;
      default:
        return "Dopravní nehoda";
        break;
    }
  };

  const renderMarkers = () => {
    return posts.map((marker, i) => {
      console.log(marker.location);
      if (!marker.location || marker.location === "") return null;

      return (
        <Marker
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={i}
          coordinate={{
            latitude: marker.location.latitude,
            longitude: marker.location.longitude,
          }}
          title={setTitle()}
          description={marker.text}
        >
          <View
            style={{
              borderRadius: 50,
              backgroundColor: colors.primary,
              padding: 10,
            }}
          >
            <ImageWrapper
              source={setTypeImage(marker.type)}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </View>
        </Marker>
      );
    });
  };

  const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("PERMISSION NOT GRANTED!");
      //setErrorMessage('PERMISSION NOT GRANTED')
    }

    const userLocation = await Location.getCurrentPositionAsync();

    setLocation(userLocation);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
    <NavigationEvents
    onWillFocus={() => {
      loadData();
    }}
      onWillBlur={() => {
        setPosts([])
        setFollowings([])
      }}
    />
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          width: 35,
          height: 35,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
          position: "absolute",
          zIndex: 10,
          top: 40,
          right: 20,
        }}
        onPress={() => props.navigation.goBack()}
      >
        <Ionicons name="md-close" size={30} color={colors.shadowBackground} />
      </TouchableOpacity>

      <MapView
        showsTraffic={true}
        style={styles.container}
        region={{
          latitude: location ? location.coords.latitude : 0,
          longitude: location ? location.coords.longitude : 0,
          longitudeDelta: 0.0421,
          latitudeDelta: 0.0922,
        }}
      >
        <Marker
          coordinate={{
            latitude: location ? location.coords.latitude : 0,
            longitude: location ? location.coords.longitude : 0,
          }}
        ></Marker>
        {posts ? renderMarkers() : null}
      </MapView>
      {loading ? (
        <View
          style={{
            backgroundColor: "rgb(255,255,255)",
            zIndex: 10,
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapScreen;
