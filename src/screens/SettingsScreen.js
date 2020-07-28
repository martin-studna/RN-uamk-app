import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";

const SettingsScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={32} color={colors.uamkBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nastavení</Text>
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
    backgroundColor: colors.primary,
    width: "100%",
    height: 90,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    marginLeft: 15,
    color: colors.uamkBlue,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default SettingsScreen;
