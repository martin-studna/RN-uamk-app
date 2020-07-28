import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { StatusBar } from "expo-status-bar";
import colors from "../colors";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/backgroundimage_zoom.png")}
    >
      <StatusBar barStyle="light-content"></StatusBar>

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
            placeholder="Email..."
            onChangeText={(email) => setEmail(email)}
            value={email}
            autoCapitalize="none"
          ></TextInput>
        </View>

        <View style={{ marginTop: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Heslo..."
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            value={password}
          ></TextInput>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>
          Přihlásit se
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}></View>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>
          Registrovat se
        </Text>
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
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  logo: {
    marginTop: 50,
    width: 120,
    height: 120,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 40,
    paddingHorizontal: 20,
    width: "100%",
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
    backgroundColor: colors.primary,
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    borderRadius: 30,
    marginBottom: 15,
  },
});

export default LoginScreen;
