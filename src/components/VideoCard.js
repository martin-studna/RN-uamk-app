import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, Linking } from "react-native";
import FastImage from "react-native-fast-image";
import ImageWrapper from "./ImageWrapper";

const VideoCard = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(`https://m.youtube.com/watch?v=${props.videoId}`) }>
      <View style={styles.header}>
        <ImageWrapper source={require('../assets/prima.png')} style={{resizeMode: 'stretch', width: 50, height: 25}} resizeMode='stretch' />
        <ImageWrapper source={require('../assets/book.png')} style={{resizeMode: 'stretch', width: 45, height: 45}} resizeMode='stretch' />
      </View>
      <Text style={{ fontWeight: 'bold', marginBottom: 10, color: '#5e5e5e', fontSize: 15}}>{props.title}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', }}>
        <ImageWrapper
          source={{ uri: props.medium.url }}
          style={{ width: 120, height: 70, resizeMode: 'stretch' }}
          resizeMode='stretch'
        />
        <Text style={{color: 'grey', width: 200, marginLeft: 10}}>{props.description}</Text>
      </View>
    </TouchableOpacity>
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
