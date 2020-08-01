import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { color } from 'react-native-reanimated';
import colors from '../colors';


const UserCard = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('User', {uid: props.id})}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image style={styles.image} source={props.image ? {uri: props.image} : require('../assets/profile_image.png')}/>
        <Text style={styles.username}>{props.username}</Text>
      </View>
      <View style={{flex: 1}}></View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Odebírat</Text>
        </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    padding: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 15
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.uamkBlue
  },
  followButton: {
    backgroundColor: colors.uamkBlue,
    height: 37,
    width: 100,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButtonText: {
    color: colors.primary,
    fontWeight: 'bold'
  }
})

export default UserCard;