import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const MapScreen = (props) => {
  return (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
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
