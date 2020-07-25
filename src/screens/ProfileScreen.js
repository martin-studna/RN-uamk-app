import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Username</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image 
          source={require('../assets/profile_image.png')}
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
            <TouchableOpacity style={styles.profileButton} onPress={() => props.navigation.navigate('ProfileSettings') }>
              <Text style={styles.profileButtonText}>Upravit profil</Text>
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
    flexDirection: 'row',
    width: "100%",
    paddingHorizontal: 40,
    marginTop: 30
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20
  },
  statusElement: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 75,
    textAlign: 'center',
  },
  statusTitle: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.uamkBlue,
  },
  statusNumber: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.uamkBlue,
    fontWeight: 'bold'
  },
  profileDescription: {
    display: 'flex',
    alignItems: 'center'
  },
  profileButtonContainer: {
    marginTop: 20,
    backgroundColor: colors.uamkBlue,
    color: 'white',
    borderRadius: 50,
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileButton: {

  },
  profileButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
    paddingVertical: 7,
    paddingHorizontal: 15
  }
});

export default ProfileScreen;
