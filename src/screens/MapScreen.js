import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const MapScreen = (props) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLocation();
  }, []);

  getLocation = async () => {
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
    setLoading(false);
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
