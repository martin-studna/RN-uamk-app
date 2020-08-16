import React from "react";
import Constants from "expo-constants";
import { Image } from "react-native";
import FastImage from "react-native-fast-image";

const ImageWrapper = (props) => {
  const setResizeModeForFastImage = () => {
    console.log(props.resizeMode);

    if (props.resizeMode === undefined || props.resizeMode === null)
      return null;

    if (props.resizeMode === "stretch") return FastImage.resizeMode.stretch;
    else if (props.resizeMode === "contain") return FastImage.resizeMode.contain;
    else if (props.resizeMode === "cover") return FastImage.resizeMode.cover;
    
  };

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
