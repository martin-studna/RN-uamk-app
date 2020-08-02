import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Fire from "../Fire";

const UserScreen = (props) => {
  const [user, setUser] = useState(null);
  const [followStatus, setFollowStatus] = useState('Odebírat')

  useEffect(() => {

    console.log('did mount')

    Fire.shared
      .getUserByIdAsync(props.navigation.state.params.uid)
      .then((user) => {
        setUser(user.data())

        Fire.shared
          .getFollowingByUserIdAsync(props.navigation.state.params.uid)
          .then(res => {
            

            if (res.data()) {
              setFollowStatus('Odebírám')
            }
          })
      }, [])
      .catch((err) => console.error(err));

    
  }, []);

  const followButtonAction = () => {

    console.log('follow')

    if (followStatus === 'Odebírat') 
    {
      Fire.shared
        .followUserByIdAsync(props.navigation.state.params.uid)
        .then(() => setFollowStatus('Odebírám'))
    }
    else {
      Fire.shared
        .unfollowUserByIdAsync(props.navigation.state.params.uid)
        .then(() => setFollowStatus('Odebírat'))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {user && user.username ? user.username : ""}
        </Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={
            user && user.image
              ? { uri: user.image }
              : require("../assets/profile_image.png")
          }
          style={styles.profileImage}
        />
        <View style={styles.profileDescription}>
          <View style={styles.statusContainer}>
            <View style={styles.statusElement}>
              <Text style={styles.statusNumber}>0</Text>
              <Text style={styles.statusTitle}>Nahlášených nehod</Text>
            </View>
            <View style={styles.statusElement}>
              <Text style={styles.statusNumber}>0</Text>
              <Text style={styles.statusTitle}>Odebírající</Text>
            </View>
            <View style={styles.statusElement}>
              <Text style={styles.statusNumber}>0</Text>
              <Text style={styles.statusTitle}>Odebírám</Text>
            </View>
          </View>
          <View style={styles.profileButtonContainer}>
            <TouchableOpacity style={styles.profileButton} onPress={() => followButtonAction()}>
              <Text style={styles.profileButtonText}>{followStatus}</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 20,
    fontWeight: "bold",
    color: colors.uamkBlue,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 40,
    marginTop: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
  },
  statusElement: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 75,
    textAlign: "center",
  },
  statusTitle: {
    textAlign: "center",
    fontSize: 12,
    color: colors.uamkBlue,
  },
  statusNumber: {
    textAlign: "center",
    fontSize: 12,
    color: colors.uamkBlue,
    fontWeight: "bold",
  },
  profileDescription: {
    display: "flex",
    alignItems: "center",
  },
  profileButtonContainer: {
    marginTop: 20,
    backgroundColor: colors.uamkBlue,
    color: "white",
    borderRadius: 50,
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileButton: {},
  profileButtonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 12,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
});

export default UserScreen;
