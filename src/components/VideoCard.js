import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const VideoCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/prima.png')} style={{resizeMode: 'stretch', width: 50, height: 25}}/>
        <Image source={require('../assets/book.png')} style={{resizeMode: 'stretch', width: 45, height: 45}}/>
      </View>
      <Text style={{ fontWeight: 'bold', marginBottom: 10, color: '#5e5e5e', fontSize: 15}}>{props.title}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', }}>
        <Image
          source={{ uri: props.medium.url }}
          style={{ width: 120, height: 70, resizeMode: 'stretch' }}
        />
        <Text style={{color: 'grey', width: 200, marginLeft: 10}}>{props.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 30,
    padding: 20,
  },
  header: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  }
});

export default VideoCard;
