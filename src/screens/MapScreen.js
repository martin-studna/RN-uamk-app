import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default class MapScreen extends React.Component {
  state = {
    latitude: 0,
    longitude: 0,
  };

  constructor(props) {
    super(props);
    this.getLocation();
  }

  componentDidMount() {
    console.log("foweijfiowe");
  }

  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("PERMISSION NOT GRANTED!");
      //setErrorMessage('PERMISSION NOT GRANTED')
    }

    const userLocation = await Location.getCurrentPositionAsync();
    console.log(userLocation);
    this.setState({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    });
  };

  render() {
    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
