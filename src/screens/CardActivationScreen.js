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

    const result = await Fire.shared.addCardAsync(user.id, code);

    const userResult = await Fire.shared.updateUserByIdAsync(user.id, {
      cardId: result.id,
      cardActivationCode: code,
    })
    .then(() => {
      setProgressCard(false)
      props.navigation.navigate('Home')
    })
    .catch(err => {

    })
  };

  return (
    <View style={styles.container}>
      <ProgressDialog 
        visible={progressCard}
        title='Aktivace karty'
        text='Prosím, čekejte, tohle může chvíli trvat...'
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={32} color={colors.uamkBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aktivace karty</Text>
      </View>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.content}>
          <Image
            source={require("../assets/uamk_logo.png")}
            style={{ width: 110, height: 110 }}
          />
          <Text style={{ marginTop: 20, fontSize: 18 }}>
            Zadejte číslo karty
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

          <Image
            style={{
              width: 240,
              height: 130,
              resizeMode: "stretch",
              marginBottom: 15,
            }}
            source={require("../assets/uamk_card.jpg")}
          />
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              width: 200,
              marginBottom: 5,
            }}
          >
            Kartu si vyzvednete na kterékoli čerpací stanici MOL ČR
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "red",
              fontSize: 17,
              width: 200,
              textAlign: "center",
            }}
          >
            proti předložení této obrazovky
          </Text>
          <Text style={{ marginTop: 10, color: "#c2c2c2", marginBottom: 30 }}>
            nejpozději do xx.xx.xxxx
          </Text>
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
