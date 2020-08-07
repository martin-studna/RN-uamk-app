import React from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";

const AboutFirstScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>O projektu</Text>
      </View>
      <ScrollView style={{flex: 1, width: '100%'}} contentContainerStyle={{display: "flex", alignItems: "center"}}>
        <View style={styles.content}>
          <Text style={styles.paragraph}>
            Autorem projektu{" "}
            <Text style={{ fontWeight: "bold" }}>Zíráním nepomůžeš</Text> je
            Ústřední automotoklub České republiky z. s. Důvodem jeho vzniku je
            především neuspokojivá situace na českých silnicích a dálnicích.
            Zejména velmi rychle se zvyšující počet a závažnost následků
            dopravních nehod způsobených nevěnováním se řízení.
          </Text>
          <Text style={styles.paragraph}>
            Cílem projektu je snížení počtu a následků těchto nehod. Tím projekt
            přispěje ke zvýšení bezpečnosti a plynulosti provozu na dálnicích a
            silnicích pro motorová vozidla.
          </Text>
          <Text style={styles.paragraph}>
            Vytčeného cíle bude dosaženo celostátní informační a osvětovou
            kampaní, informující srozumitelnou a atraktivní formou o závažném
            nebezpečí plynoucím z faktu nevěnování se řízení vozidla.
          </Text>
          <Text style={styles.paragraph}>
            Mediálním partnerem projektu je TV Prima spolu se seriálem Modrý
            kód.
          </Text>
          <Text style={styles.paragraph}>
            Projekt Zíráním nepomůžeš je financován z fondu zábrany škod České
            kanceláře pojistitelů.
          </Text>
        </View>

        <View style={styles.imagesContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.uamk.cz")}
          >
            <Image
              source={require("../assets/uamk_logo.png")}
              style={styles.uamkLogo}
            />
          </TouchableOpacity>
          <View style={styles.imageColumn}>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.iprima.cz/")}
            >
              <Image
                source={require("../assets/prima.png")}
                style={styles.primaLogo}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://prima.iprima.cz/porady/modry-kod")
              }
            >
              <Image
                source={require("../assets/modry_kod_img.png")}
                style={styles.bluecodeLogo}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Home')}>
          <Text style={{ fontWeight: 'bold', color: colors.uamkBlue, fontSize: 16}}>Pokračovat</Text>
        </TouchableOpacity>
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
    margin: 10,
    marginTop: 30,
  },
  paragraph: {
    marginBottom: 9,
    color: 'black'
  },
  uamkLogo: {
    width: 120,
    height: 120,
    marginRight: 30,
  },
  primaLogo: {
    width: 100,
    height: 40,
    resizeMode: "stretch",
  },
  bluecodeLogo: {
    marginTop: 30,
    height: 40,
    width: 110,
    resizeMode: "stretch",
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
  },
  imageColumn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 50,
    backgroundColor: colors.primary,
    marginHorizontal: 30,
    borderRadius: 30,
    width: 300,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AboutFirstScreen;
