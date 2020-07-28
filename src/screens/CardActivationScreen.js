import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CardActivationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CardActivation Screen</Text>
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

export default CardActivationScreen;
