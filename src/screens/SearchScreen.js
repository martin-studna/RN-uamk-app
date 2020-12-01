import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserCard from "../components/UserCard.js";
import colors from "../colors.js";
import Fire from "../Fire.js";
import firebase from 'firebase'
import { NavigationEvents } from "react-navigation";

const SearchScreen = props => {
  let onEndReachedCallDuringMomentum = false;

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false)
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [lastUser, setLastUser] = useState(null)

  const usersRef = Fire.shared.getUsersRef();
  
  const isInitialMount = useRef(true) 

  useEffect(() => {
    if (isInitialMount.current) {
      console.log("mounted");
      isInitialMount.current = false  
      getUsers(true)    
    }
    else {
      getUsers()
    }
  }, [search])

  const getUsers = async (limit = false) => {
    setIsLoading(true);

    let snapshot = null

    try {
      if (limit) {
        console.log("limit");
        snapshot = await usersRef
          .orderBy("username")
          .startAt(search)
          .endAt(search + "\uf8ff")
          .limit(6)
          .get();
      } else {
        console.log("not limit");
        snapshot = await usersRef
          .orderBy("username")
          .startAt(search)
          .endAt(search + "\uf8ff")
          .get();
      }
      
      if (!snapshot.empty) {
        let newUsers = [];

        setLastUser(snapshot.docs[snapshot.docs.length - 1]);
        for (let i = 0; i < snapshot.docs.length; i++) {
          if (snapshot.docs[i].id === firebase.auth().currentUser.uid)
            continue
          newUsers.push({ id: snapshot.docs[i].id, ...snapshot.docs[i].data()});
        }

        setUsers(newUsers);
      }
      else {
        setUsers([])
        setLastUser(null)
      }

      setIsLoading(false);
    } catch (error) {
      
      console.debug(error.message)
      Alert.alert(
        "Bohužel došlo k chybě připojení se serverem.",
        'Žádáme Vás o strpení. Pracujeme na tom.',
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      setIsLoading(false)
      setIsMoreLoading(false)
      return
    }
  };

  const getMore = async () => {

    if (lastUser) {
      setIsMoreLoading(true)

      setTimeout(async () => {
        let snapshot = null;
        try {
          
          snapshot = await usersRef
            .orderBy("username")
            .startAt(search)
            .endAt(search + "\uf8ff")
            .startAfter(lastUser.data().username)
            .limit(6)
            .get();


        } catch (error) {
          console.warn(error)
          setIsLoading(false)
          setIsMoreLoading(false)
          return;
        }

        if (!snapshot.empty) {
          if (snapshot.docs[snapshot.docs.length - 1].id === lastUser.id) {
            setIsMoreLoading(false)
            return;
          }

          let newUsers = users

          setLastUser(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            if (snapshot.docs[i].id === firebase.auth().currentUser.uid)
              continue
            newUsers.push({ id: snapshot.docs[i].id, ...snapshot.docs[i].data()});
          }

          setUsers(newUsers)
          if (snapshot.docs.length < 6) setLastUser(null)
        }
        else {
          setLastUser(null)
        }

        setIsMoreLoading(false)
      }, 1000)
    }

    onEndReachedCallDuringMomentum = false;
  }

  const renderFooter = () => {
    if (!isMoreLoading) return true;

    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{ marginBottom: 14 }}
      />
    );
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
    <NavigationEvents 
      onWillFocus={() => {
        setSearch('')
      }}
    />
      <View style={styles.header}>
        <Ionicons name="md-search" size={32} color={colors.uamkBlue} />
        <TextInput
          style={styles.searchBar}
          placeholder="Hledat"
          value={search}
          onChangeText={(term) => {
            setUsers([])
            setSearch(term)
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
        ListFooterComponent={renderFooter}
        maxToRenderPerBatch={10}
        initialNumToRender={6}
        onMomentumScrollBegin={() => {
          onEndReachedCallDuringMomentum = false
        }}
        onEndReached={() => {
          if (!onEndReachedCallDuringMomentum && !isMoreLoading)
            getMore()
        }}
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
    height: Platform.OS === 'android' ? 60 : 100,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
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
