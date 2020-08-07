import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";
import Global from '../global'

const MenuScreen = (props) => {
  return (
    <View style={styles.container}>
    <NavigationEvents 
      onWillFocus={() => {
        Global.postDescription = null
        Global.postImage = null
        Global.postDifficulty = null
      }}
    />
      <View style={styles.exitContainer}>
        <TouchableOpacity
          style={styles.exit}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="md-close" size={30} color={colors.shadowBackground} />
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.element} onPress={() => props.navigation.navigate(('TrafficJam'))}>
            <View style={styles.circle}>
              <Image
                style={styles.logo}
                source={require("../assets/traffic_jam_icon.png")}
              />
            </View>
            <Text style={{ fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>Kolona</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.element} onPress={() => props.navigation.navigate('Danger')}>
            <View style={styles.circle}>
              <Image
                style={styles.logo}
                source={require("../assets/danger_icon.png")}
              />
            </View>
            <Text style={{ fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>Nebezpečí</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.element} onPress={() => props.navigation.navigate('TrafficClosure')}>
            <View style={styles.circle}>
              <Image
                style={styles.logo}
                source={require("../assets/traffic_closure_icon.png")}
              />
            </View>
            <Text style={{ fontWeight: 'bold', color: '#fff', width: '50%', textAlign: 'center'}}>Dopravní uzavírka</Text>
          </TouchableOpacity>
        </View>
        <View>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shadowBackground,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  exitContainer: {
    position: "absolute",
    top: "6%",
    right: "6%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  exit: {
    width: "100%",
    height: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    marginTop: 200,
    display: "flex",
    alignItems: "center",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  circle: {
    borderRadius: 50,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5
  },
  logo: {
    width: 32,
    height: 32,
  },
  element: {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    width: 120,
    height: 120
  }
});

export default MenuScreen;
