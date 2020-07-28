import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import colors from '../colors'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";


const BlueCodeScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name='md-arrow-back' size={32} color={colors.uamkBlue}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modrý kód</Text>
      </View>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/backgroundimage_zoom.png")}
      >

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    height: 80,
    width: '100%',
    paddingLeft: 16,
    paddingTop: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    borderBottomColor: "#EBECF4",
    borderBottomWidth: 1,
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
    flexDirection: "row",
  },
  headerTitle: {
    color: colors.uamkBlue,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});

export default BlueCodeScreen;
