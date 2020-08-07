import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Slider } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import Global from "../global";

const SettingsScreen = (props) => {
  const [distance, setDistance] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={32} color={colors.uamkBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nastavení</Text>
      </View>

      <View style={{ marginTop: 100, display: "flex", alignItems: "center" }}>
        <Text style={{ textAlign: "center", marginBottom: 10, fontSize: 30 }}>
          {Global.radius} km
        </Text>

        <Slider
          maximumValue={100}
          style={{ width: 300 }}
          value={Global.radius}
          thumbTintColor={colors.primary}
          onValueChange={val => {
            setDistance(val)
            Global.radius = val
            }}
          step={10}
        ></Slider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    height: Platform.OS === 'android' ? 60 : 100,
    paddingLeft: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    flexDirection: "row",
    width: '100%'
  },
  headerTitle: {
    marginLeft: 15,
    color: colors.uamkBlue,
    fontWeight: "bold",
    fontSize: 20,
  },
  textCon: {
    width: 320,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorGrey: {
    color: "#d3d3d3",
  },
  colorYellow: {
    color: "rgb(252, 228, 149)",
  },
});

export default SettingsScreen;
