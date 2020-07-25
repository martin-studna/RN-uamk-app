import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../colors";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="md-search" size={32} />
        <TextInput 
          style={styles.searchBar} 
          placeholder="Hledat">
        </TextInput>
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
    width: '100%',
    height: 90,
    display: "flex",
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  searchBar: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    height: '100%',
    padding: 10,
  }
});

export default SearchScreen;
