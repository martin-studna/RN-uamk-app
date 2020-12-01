import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../colors";
import firebase from "firebase";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import ProgressDialog from "../components/ProgressDialog";
import Camera from "../Camera";
import ImageWrapper from "../components/ImageWrapper";

const ProfileSettingsScreen = (props) => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressUpdate, setProgressUpdate] = useState(false);
  const [progressSignOut, setProgressSignOut] = useState(false);

  const usersRef = Fire.shared.getUsersRef();

  useEffect(() => {
    Fire.shared
      .getUserByIdAsync(firebase.auth().currentUser.uid)
      .then((user) => {
        setFullname(user.data().fullname);
        setUsername(user.data().username);
        setImage(user.data().image);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });

    firebase.auth().onAuthStateChanged((user) => {
      setProgressSignOut(false);
      props.navigation.navigate(user ? "App" : "Auth");
    });
  }, []);

  const signOutUser = async () => {
    setProgressSignOut(true);
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.warn(e);
    }
  };

  const choosePhotoFromLibrary = async () => {
    let result = await Camera.shared.choosePhotoFromLibraryAsync();
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const updateProfile = async () => {
    setProgressUpdate(true);

    let uri = null;

    if (image !== null) uri = await Fire.shared.uploadPhotoAsync(image);

    if (username !== "") {
      const snapshot = await usersRef
        .orderBy("username")
        .startAt(username)
        .endAt(username)
        .get();

      if (!snapshot.empty) {
        const filter = snapshot.docs.filter(
          (user) => user.id === firebase.auth().currentUser.uid
        );

        if (filter.length === 0) {
          Alert.alert(
            "Bohužel toto uživatelské jméno je už zabrané.",
            null,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );

          setProgressUpdate(false);
          return;
        }
      }
    }

    const updates = {
      image: uri,
      username,
      fullname,
    };

    Fire.shared
      .updateUserByIdAsync(firebase.auth().currentUser.uid, updates)
      .then((res) => {
        setProgressUpdate(false);
        props.navigation.navigate("Home");
      })
      .catch((err) => console.warn(err));
  };

  return (
    <View style={styles.container}>
      <ProgressDialog visible={loading} />
      <ProgressDialog
        visible={progressUpdate}
        title={"Nastavení účtu"}
        text={"Prosím, čekejte, aktualizujeme Váš profil..."}
      />
      <ProgressDialog
        visible={progressSignOut}
        title={"Odhlásit"}
        text={"Prosím, počkejte chvíli..."}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="md-close" size={32} color={colors.uamkBlue} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateProfile()}>
          <Ionicons name="md-checkmark" size={32} color={colors.uamkBlue} />
        </TouchableOpacity>
      </View>
      <ImageWrapper
        source={image ? { uri: image } : require("../assets/profile_image.png")}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.changeImage}
        onPress={() => choosePhotoFromLibrary()}
      >
        <Text
          style={{ fontWeight: "bold", color: colors.uamkBlue, fontSize: 16 }}
        >
          Změnit
        </Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Celé jméno"
        onChangeText={(fullname) => setFullname(fullname)}
        value={fullname}
        style={styles.editFullname}
      ></TextInput>
      <TextInput
        placeholder="Uživatelské jméno"
        value={username}
        onChangeText={(username) => setUsername(username)}
        style={styles.editUsername}
      ></TextInput>
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
  header: {
    height: Platform.OS === "android" ? 60 : 100,
    width: "100%",
    backgroundColor: colors.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    paddingHorizontal: 15,
  },
});

export default ProfileSettingsScreen;
