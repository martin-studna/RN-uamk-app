import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../colors";
import firebase from "firebase";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";



const ProfileSettingsScreen = (props) => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getPhotoPermission();

    Fire.shared.getUserById(firebase.auth().currentUser.uid).then((user) => {
      setFullname(user.data().fullname);
      setUsername(user.data().username);
      setImage(user.data().image);
    });

    firebase.auth().onAuthStateChanged((user) => {
      props.navigation.navigate(user ? "App" : "Auth");
    });
  }, []);

  const signOutUser = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  const getPhotoPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status != "granted") {
      alert("We need permission to access your camera roll");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={image ? {uri: image} : require("../assets/profile_image.png")}
        style={styles.image}
      />
      <TouchableOpacity style={styles.changeImage} onPress={() => pickImage()}>
        <Text
          style={{ fontWeight: "bold", color: colors.uamkBlue, fontSize: 16 }}
        >
          Změnit
        </Text>
      </TouchableOpacity>
      <TextInput placeholder="Celé jméno" style={styles.editFullname}>
        {fullname}
      </TextInput>
      <TextInput placeholder="Jméno" style={styles.editUsername}>
        {username}
      </TextInput>
      <View style={{ flex: 1 }}></View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logout} onPress={() => signOutUser()}>
          <Text
            style={{ color: colors.primary, fontWeight: "bold", fontSize: 16 }}
          >
            Odhlásit se
          </Text>
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
    marginTop: 50,
  },
  changeImage: {
    marginTop: 10,
  },
  editFullname: {
    width: "80%",
    height: 50,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
    borderWidth: 2,
    paddingLeft: 20,
    borderColor: colors.uamkBlue,
  },
  editUsername: {
    marginTop: 20,
    backgroundColor: "white",
    width: "80%",
    height: 50,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.uamkBlue,
  },
  logoutContainer: {
    marginBottom: 40,
    backgroundColor: colors.uamkBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: 150,
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileSettingsScreen;