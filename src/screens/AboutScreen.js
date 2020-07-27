import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";

const AboutScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={32} color={colors.uamkBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>O projektu</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.paragraph}>
          Autorem projektu <Text style={{fontWeight: "bold"}}>Zíráním nepomůžeš</Text> je Ústřední automotoklub České
          republiky z. s. Důvodem jeho vzniku je především neuspokojivá situace
          na českých silnicích a dálnicích. Zejména velmi rychle se zvyšující
          počet a závažnost následků dopravních nehod způsobených nevěnováním se
          řízení.
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
          Mediálním partnerem projektu je TV Prima spolu se seriálem Modrý kód.
        </Text>
        <Text style={styles.paragraph}>
          Projekt Zíráním nepomůžeš je financován z fondu zábrany škod České
          kanceláře pojistitelů.
        </Text>
      </View>

      <View style={styles.imagesContainer}>
        <Image source={require('../assets/uamk_logo.png')} style={styles.uamkLogo} />
        <View style={styles.imageColumn}>
          <Image source={require('../assets/prima.png')} style={styles.primaLogo}/>
          <Image source={require('../assets/modry_kod_img.png')} style={styles.bluecodeLogo}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 90,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    marginLeft: 15,
    color: colors.uamkBlue,
    fontWeight: "bold",
    fontSize: 20,
  },
  content: {
    margin: 10,
    marginTop: 30
  },
  paragraph: {
    marginBottom: 9
  },
  uamkLogo: {
    width: 120,
    height: 120,
    marginRight: 30
  },
  primaLogo: {
    width: 100,
    height: 40,
    resizeMode: 'stretch',
  },
  bluecodeLogo: {
    marginTop: 30,
    height: 40,
    width: 110,
    resizeMode: 'stretch',
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  imageColumn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AboutScreen;