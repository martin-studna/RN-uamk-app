import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import Fire from "../Fire.js";
import colors from "../colors";
import ProgressDialog from "../components/ProgressDialog.js";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [progress, setProgress] = useState(false)

  const handleSignUp = () => {
    setProgress(true)

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return Fire.shared.addUserAsync({
            uid: cred.user.uid,
            username: name,
            mail: email,
            password,
        })
        .then(() => {
          setProgress(false)
        })
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/backgroundimage_zoom.png")}
    >
    <ProgressDialog 
      visible={progress}
      title={'Zaregistrovat se'}
      text={'Prosím počkejte, tohle může chvíli trvat...'}
    />
      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <Image
        source={require("../assets/zirani_logo_circle.png")}
        style={styles.logo}
      />

      <View style={styles.form}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(name) => setName(name)}
            value={name}
            placeholder="Uživatelské jméno..."
            autoCapitalize="none"
          ></TextInput>
        </View>

        <View style={{ marginTop: 10 }}>
          <TextInput
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
            value={email}
            placeholder="Email..."
            autoCapitalize="none"
          ></TextInput>
        </View>

        <View style={{ marginTop: 10 }}>
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Heslo..."
            onChangeText={(password) => setPassword(password)}
            value={password}
          ></TextInput>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Registrovat se</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }}></View>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => props.navigation.navigate("Login")}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16  }}>Už máte účet? Přihlásit se</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  logo: {
    marginTop: 50,
    width: 120,
    height: 120,
  },
  form: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 40,
    paddingHorizontal: 20,
    width: "100%",
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 45,
    fontSize: 15,
    padding: 10,
    paddingLeft: 20,

    backgroundColor: "white",
    borderRadius: 13,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "white",
    borderRadius: 30,
    width: 300,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButton: {
    backgroundColor: colors.primaryDark,
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    borderRadius: 30,
    marginBottom: 15,
  },
});

export default RegisterScreen;
