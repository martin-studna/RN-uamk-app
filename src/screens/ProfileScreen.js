import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Fire from "../Fire";
import firebase from "firebase";
import { ActivityIndicator } from "react-native-paper";
import { NavigationEvents } from "react-navigation";

const ProfileScreen = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [posts, setPosts] = useState(0);

  const [accidents, setAccidents] = useState(0)
  const [danger, setDanger] = useState(0)
  const [jams, setJams] = useState(0)
  const [closures, setClosures] = useState(0)


  useEffect(() => {}, []);

  const getFollowers = async () => {
    Fire.shared
      .getFollowersByUserIdAsync(firebase.auth().currentUser.uid)
      .then((result) => {
        setFollowers(result.docs.length);
      })
      .catch((err) => console.error("Error: ", err));
  };

  const getFollowings = async () => {
    Fire.shared
      .getFollowingByUserIdAsync(firebase.auth().currentUser.uid)
      .then((result) => {
        setFollowing(result.docs.length);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const getPosts = async () => {
    Fire.shared
      .getPostsByUserIdAsync(firebase.auth().currentUser.uid)
      .then((result) => {
        setPosts(result.length);

        for (let i = 0; i < result.length; i++) {
          addTypePost(result[i])
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  const addTypePost = (post) => {
    switch (post.type) {
      case "car_accident":
        setAccidents(acc => acc + 1)
        break;
      case "traffic_closure":
        setClosures(clos => clos + 1)
        break;
      case "traffic_jam":
        setJams(jam => jam + 1)
        break;
      case "danger":
        setDanger(danger => danger + 1)
        break;
      default:
        break;
    }
  };

  const getData = () => {
    setLoading(true);
    Fire.shared
      .getUserByIdAsync(firebase.auth().currentUser.uid)
      .then((user) => {
        setUser(user.data());
        setTimeout(() => {
          setLoading(false);
        }, 100);
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          setAccidents(0)
          setClosures(0)
          setJams(0)
          setDanger(0)

          getData();
          getFollowings();
          getFollowers();
          getPosts();
        }}
      />
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
              <Text style={styles.statusNumber}>{posts}</Text>
              <Text style={styles.statusTitle}>Nahlášených nehod</Text>
            </View>
            <View style={styles.statusElement}>
              <Text style={styles.statusNumber}>{followers}</Text>
              <Text style={styles.statusTitle}>Odebírající</Text>
            </View>
            <View style={styles.statusElement}>
              <Text style={styles.statusNumber}>{following}</Text>
              <Text style={styles.statusTitle}>Odebírám</Text>
            </View>
          </View>
          <View style={styles.profileButtonContainer}>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() =>
                props.navigation.navigate("ProfileSettings", {
                  onGoBack: () => {
                    console.log("Returning");
                  },
                })
              }
            >
              <Text style={styles.profileButtonText}>Upravit profil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.points}>Body: {user ? user.points : 0}</Text>

      <View style={{ width: "90%", marginTop: 40 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: colors.uamkBlue,
            marginBottom: 10,
          }}
        >
          Nahlášené dopravní události:
        </Text>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              marginBottom: 10,
              fontWeight: "bold",
              color: colors.uamkBlue,
            }}
          >
            Dopravní nehody: {accidents}
          </Text>
          <Text
            style={{
              marginBottom: 10,
              fontWeight: "bold",
              color: colors.uamkBlue,
            }}
          >
            Dopravní nebezpečí: {danger}
          </Text>
          <Text
            style={{
              marginBottom: 10,
              fontWeight: "bold",
              color: colors.uamkBlue,
            }}
          >
            Dopravní zácpy: {jams}
          </Text>
          <Text
            style={{
              marginBottom: 10,
              fontWeight: "bold",
              color: colors.uamkBlue,
            }}
          >
            Dopravní uzavírky: {closures}
          </Text>
        </View>
      </View>

      {loading ? (
        <View
          style={{
            backgroundColor: "rgb(255,255,255)",
            zIndex: 10,
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : null}
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
    fontWeight: "bold"
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
  points: {
    marginTop: 30,
    fontWeight: "bold",
    color: colors.uamkBlue,
    fontSize: 18,
  },
});

export default ProfileScreen;
