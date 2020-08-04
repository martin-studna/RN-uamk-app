import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Fire from '../Fire'
import colors from "../colors";

const MapScreen = (props) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const postsRef = Fire.shared.getPostsRef();


  useEffect(() => {
    setLoading(true);
    getLocation();
    getPosts()
  }, []);

  const getPosts = async () => {


    const snapshot = await postsRef.get();

    if (!snapshot.empty) {
      let newPosts = [];

      for (let i = 0; i < snapshot.docs.length; i++) {

        if(!snapshot.docs[i].data().text)
          continue;

        newPosts.push(snapshot.docs[i].data());
      }

      console.log(newPosts)
      setPosts(newPosts);
    }
    setLoading(false)
  }

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
        return 'Dopravní nehoda';
        break;
      case "traffic_jam":
        return 'Dopravní zácpa';
        break;
      case "traffic_closure":
        return 'Dopravní uzavírka';
        break;
      case "danger":
        return 'Dopravní nebezpečí';
        break;
      default:
        return 'Dopravní nehoda';
        break;
    }
  }

  const renderMarkers = () => {

    return (
      posts.map((marker,i) => (
        <Marker 
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          key={i}
          coordinate={{latitude: marker.location.latitude, longitude: marker.location.longitude}}
          title={setTitle()}
          description={marker.text}
        >
        <View style={{borderRadius: 50, backgroundColor: colors.primary, padding: 10}}>
          <Image source={setTypeImage(marker.type)} style={{width: 20, height: 20, }} resizeMode='contain'/>

        </View>
        </Marker>
      ))
    )

  }

  const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("PERMISSION NOT GRANTED!");
      //setErrorMessage('PERMISSION NOT GRANTED')
    }

    const userLocation = await Location.getCurrentPositionAsync();

    setLocation({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: location.latitudeDelta,
      longitudeDelta: location.longitudeDelta,
    });
    console.log(location);
  };

  return (
    <View style={{ flex: 1, width: "100%"}}>

      <MapView style={styles.container} region={location}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        ></Marker>
        { posts ? renderMarkers() : null}
      </MapView>
      { loading ? (
        <View style={{backgroundColor: 'rgb(255,255,255)', zIndex: 10, position: 'absolute', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='large'/>
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
