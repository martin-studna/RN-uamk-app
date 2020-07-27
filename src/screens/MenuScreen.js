import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../colors";

const MenuScreen = (props) => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.shadowBackground
  },
});

export default MenuScreen;
