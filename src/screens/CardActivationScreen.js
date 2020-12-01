import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import firebase from "firebase";
import ProgressDialog from "../components/ProgressDialog";
import ImageWrapper from "../components/ImageWrapper";

const CardActivationScreen = (props) => {
  const [code, setCode] = useState("");
  const [user, setUser] = useState(null);
  const [progressCard, setProgressCard] = useState(false)

  useEffect(() => {
    Fire.shared
      .getUserByIdAsync(firebase.auth().currentUser.uid)
      .then((user) => {
        setUser(user);
      })
      .catch((err) => console.error(err));
  }, []);

  const activateCard = async () => {
    if (user.data().cardId !== null) {
      Alert.alert(
        "Kartu máte už aktivovanou.",
        null,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      return;
    }

    setProgressCard(true)

    try {
      const result = await Fire.shared.addCardAsync(user.id, code);
      await Fire.shared.updateUserByIdAsync(user.id, {
        cardId: result.id,
        cardActivationCode: code,
      })
      await Fire.shared.addPoints(100)
      
    } catch (error) {
      console.error(error)
    }



    setProgressCard(false)
    props.navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <ProgressDialog 
        visible={progressCard}
        title='Aktivace asistenční karty'
        text='Prosím, čekejte, tohle může chvíli trvat...'
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={32} color={colors.uamkBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aktivace asistenční karty</Text>
      </View>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.content}>
          <ImageWrapper
            source={require("../assets/uamk_logo.png")}
            style={{ width: 110, height: 110 }}
            resizeMode="stretch"
          />
          <Text style={{ marginTop: 20, fontSize: 18, textAlign: "center", color: "black", marginHorizontal: 30 }}>
            Zadejte číslo karty, která Vám byla zaslána poštou.
          </Text>
          <TextInput
            placeholder="9220000000"
            style={styles.input}
            value={code}
            onChangeText={(input) => setCode(input)}
          ></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={() => activateCard()}
          >
            <Text
              style={{ fontWeight: "700", fontSize: 16, color: colors.primary }}
            >
              Aktivovat
            </Text>
          </TouchableOpacity>

          <ImageWrapper
            style={{
              width: 240,
              height: 130,
              resizeMode: "stretch",
              marginBottom: 15,
            }}
            resizeMode="stretch"
            source={require("../assets/uamk_card.jpg")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    height: Platform.OS === 'android' ? 60 : 100,
    paddingLeft: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    flexDirection: "row",
    width: '100%'
  },
  headerTitle: {
    marginLeft: 15,
    color: colors.uamkBlue,
    fontWeight: "bold",
    fontSize: 20,
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  input: {
    height: 65,
    marginTop: 20,
    width: 280,
    fontSize: 28,
    textAlign: "center",
    padding: 10,
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
  },
  button: {
    marginVertical: 15,
    backgroundColor: colors.uamkBlue,
    borderRadius: 30,
    width: 200,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CardActivationScreen;
