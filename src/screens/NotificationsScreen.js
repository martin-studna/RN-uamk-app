import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationEvents } from 'react-navigation'
import colors from "../colors";

const NotificationsScreen = (props) => {

  return (
    <View style={styles.container}>
    <NavigationEvents
          onWillFocus={payload => {
            console.log("will focus");
          }}
        />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upozornění</Text>
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
    fontSize: 20,
    fontWeight: "bold",
    color: colors.uamkBlue,
  },
});

export default NotificationsScreen;
