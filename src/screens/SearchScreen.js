import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserCard from "../components/UserCard.js";
import colors from "../colors.js";
import Fire from "../Fire.js";
import firebase from 'firebase'

const SearchScreen = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const usersRef = Fire.shared.getUsersRef();

  useEffect(() => {
      getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);

    try {
      const snapshot = await usersRef
        .orderBy("username")
        .startAt(search)
        .endAt(search + "~")
        .get();

      let newUsers = [];

      if (!snapshot.empty) {

        for (let i = 0; i < snapshot.docs.length; i++) {
          if (snapshot.docs[i].id === firebase.auth().currentUser.uid)
            continue
          newUsers.push({ id: snapshot.docs[i].id, ...snapshot.docs[i].data() });
        }
      }

      console.log("SEARCH USERS: ", newUsers)
      setUsers(newUsers);

      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  };

  const renderUser = (user) => {
    return (
      <UserCard
        id={user.id}
        username={user.username}
        image={user.image}
        navigation={props.navigation}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="md-search" size={32} />
        <TextInput
          style={styles.searchBar}
          placeholder="Hledat"
          value={search}
          onChangeText={(term) => {
            setSearch(term);
            getUsers();
          }}
        ></TextInput>
      </View>

      <FlatList
        style={styles.feed}
        data={users}
        renderItem={({ item }) => renderUser(item)}
        key={(item) => item.id}
        showsVerticalScrollIndicator={true}
        onEndReachedThreshold={0.1}
      />
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
  searchBar: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "white",
    borderRadius: 20,
    height: "100%",
    padding: 10,
  },
  feed: {
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default SearchScreen;
