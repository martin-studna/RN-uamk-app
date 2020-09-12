import React from "react";
import Constants from "expo-constants";
import { Image } from "react-native";
import FastImage from "react-native-fast-image";

const ImageWrapper = (props) => {

  return Constants !== undefined && Constants.expoVersion !== undefined ? (
    <Image
      source={props.source}
      style={props.style}
      resizeMode={props.resizeMode}
    />
  ) : (
    <FastImage
      source={props.source}
      style={props.style}
      resizeMode={props.resizeMode}
    />
  );
};

export default ImageWrapper;
