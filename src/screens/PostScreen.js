import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire.js";
import colors from "../colors";
import Global from "../global";
import { ActionSheet, Root } from "native-base";
import Camera from "../Camera";
import { NavigationEvents } from "react-navigation";
import ProgressDialog from "../components/ProgressDialog.js";
import CallDialog from "../components/CallDialog.js";

const PostScreen = (props) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [progress, setProgress] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [callDialogVisible, setCallDialogVisible] = useState(false);

  const handlePost = async () => {
    if (!difficulty) {
      Alert.alert(
        "Zvolte závažnost situace",
        null,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }

    setProgress(true);

    try {
      await Fire.shared.addPostAsync({
        text: Global.postDescription,
        localUri: image,
        difficulty: difficulty,
        type: "car_accident",
      });
      await Fire.shared.addPoints(10);
    } catch (error) {
      console.error(error);
    }

    setText("");
    setImage(null);
    setDifficulty(null);
    setProgress(false);
    props.navigation.goBack();
  };

  const choosePhotoFromLibrary = async () => {
    let result = await Camera.shared.choosePhotoFromLibraryAsync();
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhotoFromCamera = async () => {
    const result = await Camera.shared.takePhotoFromCameraAsync();
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onClickAddImage = () => {
    const BUTTONS = ["Vyfotit", "Vybrat z galerie", "Zrušit"];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: "Fotka",
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            takePhotoFromCamera();
            break;
          case 1:
            choosePhotoFromLibrary();
            break;
          default:
            break;
        }
      }
    );
  };

  const closeFunction = () => setCallDialogVisible(val => !val)

  return (
    <Root>
      <CallDialog
        visible={callDialogVisible}
        closeFunction={closeFunction}
       />

      <ProgressDialog
        title="Nahrávám nový příspěvek"
        text="Prosím počkejte..."
        visible={progress}
      />
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {}}
          onWillBlur={() => {
            Global.postDescription = "";
            setOptionsVisible(false)
            setCallDialogVisible(false)
            setDifficulty(null);
          }}
        />
        <View style={styles.exitContainer}>
          <TouchableOpacity
            style={styles.exit}
            onPress={() => {
              setDifficulty(null);
              props.navigation.goBack();
            }}
          >
            <Ionicons
              name="md-close"
              size={30}
              color={colors.shadowBackground}
            />
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
          <TouchableOpacity
            style={[
              styles.difficultyRectangle,
              {
                backgroundColor:
                  difficulty === "easy"
                    ? colors.smallDifficulty
                    : "transparent",
              },
            ]}
            onPress={() => {
              setDifficulty("easy");
            }}
          >
            <View style={styles.carCircle}>
              <Image
                style={styles.imageCarCrash}
                source={require("../assets/car_crash_easy.png")}
              />
            </View>
            <Text style={styles.difficultyText}>Malá</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.difficultyRectangle,
              {
                backgroundColor:
                  difficulty === "medium"
                    ? colors.mediumDifficulty
                    : "transparent",
              },
            ]}
            onPress={() => {
              setDifficulty("medium");
            }}
          >
            <View style={styles.carCircle}>
              <Image
                style={styles.imageCarCrash}
                source={require("../assets/car_crash_medium.png")}
              />
            </View>
            <Text style={styles.difficultyText}>Střední</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.difficultyRectangle,
              {
                backgroundColor:
                  difficulty === "hard" ? colors.bigDifficulty : "transparent",
              },
            ]}
            onPress={() => {
              setDifficulty("hard");
            }}
          >
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
          <TouchableOpacity
            style={styles.cameraContainer}
            onPress={() => onClickAddImage()}
          >
            <Ionicons name="md-camera" size={32} color="white" />
            <Text style={{ color: "white", marginTop: 5 }}>Přidat fotku</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity
            style={styles.comment}
            onPress={() => props.navigation.navigate("Description")}
          >
            <Ionicons name="md-text" size={32} color="white" />
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 18,
                marginLeft: 20,
              }}
            >
              Přidat popis
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomPart}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 32,
              justifyContent: "space-between",
              width: "35%",
            }}
          >
            {optionsVisible ? (
              <View style={styles.callOptionButtonContainer}>
                <TouchableOpacity
                  style={styles.callOptionButton}
                  onPress={() => setCallDialogVisible(val => !val) }
                >
                  <Ionicons name="md-call" size={22} />
                </TouchableOpacity>
              </View>
            ) : null}

            {optionsVisible ? (
              <View style={styles.sendOptionButtonContainer}>
                <TouchableOpacity
                  style={styles.sendOptionButton}
                  onPress={() => handlePost()}
                >
                  <Ionicons name="md-navigate" size={22} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <View style={styles.sendButtonContainer}>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => setOptionsVisible((val) => !val)}
            >
              <Ionicons name="md-arrow-up" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBar}></View>
        </View>
      </View>
    </Root>
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
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  bottomBar: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
  },
  sendButtonContainer: {
    position: "absolute",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    zIndex: 10,
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: "#E6201B",
  },
  sendButton: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  callOptionButtonContainer: {
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#00E676",
  },
  callOptionButton: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sendOptionButtonContainer: {
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#5482FF",
  },
  sendOptionButton: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "45deg" }],
  },
});

export default PostScreen;
