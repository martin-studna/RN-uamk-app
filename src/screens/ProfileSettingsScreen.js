import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../colors";

const ProfileSettingsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/profile_image.png')} style={styles.image} />
      <TouchableOpacity style={styles.changeImage}>
        <Text style={{ fontWeight: 'bold', color: colors.uamkBlue, fontSize: 16}}>Změnit</Text>
      </TouchableOpacity>
      <TextInput placeholder='Celé jméno' style={styles.editFullname} />
      <TextInput placeholder='Jméno' style={styles.editUsername} />
      <View style={{flex: 1}}></View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logout}>
          <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 16}}>Odhlásit se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 50
  },
  changeImage: {
    marginTop: 10,
  },
  editFullname: {
    width: '80%',
    height: 50,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    borderWidth: 2,
    paddingLeft: 20,
    borderColor: colors.uamkBlue
  },
  editUsername: {
    marginTop: 20,
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.uamkBlue
  },
  logoutContainer: {
    marginBottom: 40,
    backgroundColor: colors.uamkBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: 150,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProfileSettingsScreen;
