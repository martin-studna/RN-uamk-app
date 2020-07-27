import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../Fire.js";
import * as ImagePicker from "expo-image-picker";
import colors from "../colors";

const PostScreen = (props) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [difficulty, setDifficulty] = useState(null)

  useEffect(() => {
    getPhotoPermission();
  }, []);

  getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert("We need permission to access your camera roll");
      }
    }
  };

  handlePost = () => {
    Fire.shared
      .addPost({ text: text.trim(), localUri: image })
      .then((ref) => {
        setText("");
        setImage(null);
        props.navigation.goBack();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  pickImage = async () => {
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
      <View style={styles.exitContainer}>
        <TouchableOpacity style={styles.exit} onPress={() => props.navigation.navigate('Home')} >
          <Ionicons name="md-close" size={30} color={colors.shadowBackground} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageTitle}
            source={require("../assets/plus_icon.png")}
          />
        </View>
        <Text style={styles.title}>Nahlásit nehodu</Text>
      </View>
      <View style={styles.difficultyContainer}>
        <TouchableOpacity style={styles.difficultyRectangle} onPress={() => setDifficulty('easy')}>
          <View style={styles.carCircle}>
            <Image
              style={styles.imageCarCrash}
              source={require("../assets/car_crash_easy.png")}
            />
          </View>
          <Text style={styles.difficultyText}>Malá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.difficultyRectangle} onPress={() => {
          setDifficulty('medium')
          }}>
          <View style={styles.carCircle}>
            <Image
              style={styles.imageCarCrash}
              source={require("../assets/car_crash_medium.png")}
            />
          </View>
          <Text style={styles.difficultyText}>Střední</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.difficultyRectangle} onPress={() => setDifficulty('hard')}>
          <View style={styles.carCircle}>
            <Image
              style={styles.imageCarCrash}
              source={require("../assets/car_crash_hard.png")}
            />
          </View>
          <Text style={styles.difficultyText}>Velká</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.cameraContainer}>
          <Ionicons name="md-camera" size={32} color="white" />
          <Text style={{ color: "white", marginTop: 5 }}>Přidat fotku</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity style={styles.comment} onPress={() => props.navigation.navigate('Description')}>
          <Ionicons name="md-text" size={32} color="white" />
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: 18,
              marginLeft: 20,
            }}>
            Přidat popis
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomPart}>
        <View style={styles.sendButtonContainer}>
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name='md-arrow-up' size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomBar}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shadowBackground,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
  exitContainer: {
    position: "absolute",
    top: "6%",
    right: "6%",
  },
  exit: {
    backgroundColor: "white",
    width: 32,
    height: 32,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "35%",
    width: "100%",
  },
  imageContainer: {
    display: "flex",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: colors.uamkBlue,
    padding: 10,
    marginBottom: 15,
  },
  imageTitle: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  difficultyContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: 40,
    height: 160,
  },
  difficultyRectangle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  carCircle: {
    width: 55,
    height: 55,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 12,
  },
  imageCarCrash: {
    width: "100%",
    height: "100%",
  },
  difficultyText: {
    marginTop: 2,
    color: "white",
    fontWeight: "bold",
  },
  bottomContainer: {
    height: 100,
    width: "100%",
    display: "flex",
    paddingHorizontal: 25,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  line: {
    height: "50%",
    width: 2,
    backgroundColor: "white",
  },
  cameraContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  comment: {
    display: "flex",
    width: 160,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  bottomPart: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  bottomBar: {
    width: '100%',
    height: '40%',
    backgroundColor: colors.primary
  },
  sendButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
    zIndex: 10,
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: '#E6201B'
  },
  sendButton: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default PostScreen;