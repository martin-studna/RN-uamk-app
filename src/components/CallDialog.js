import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import { Linking } from 'react-native'
import ImageWrapper from "./ImageWrapper";

const CallDialog = (props) => {
  return (
    <Modal transparent visible={props.visible}>
      <View
        style={[
          styles.container,
          { backgroundColor: props.color ? props.color : "rgba(0,0,0,0.5)" },
        ]}
      >
        <View
          style={{ borderRadius: 10, backgroundColor: "white", padding: 25 }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#ccc",
                width: 30,
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}

              onPress={props.closeFunction}
            >
              <Ionicons
                name="md-close"
                size={25}
                color={colors.shadowBackground}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 20,
              }}
            >
              <View
                style={{ width: 70, display: "flex", alignItems: "center" }}
              >
                <TouchableOpacity
                  style={[styles.callButton, { backgroundColor: "#fe0100" }]}
                  onPress={() => Linking.openURL(`tel:155`)}
                >
                  <ImageWrapper source={require("../assets/icon_ambulance.png")} resizeMode="stretch" style={{width: 30, height: 30, resizeMode: 'stretch'}} />
                </TouchableOpacity>
                <Text style={{ textAlign: "center", color: 'black' }}>Záchranná služba</Text>
              </View>
              <View
                style={{
                  width: 70,
                  display: "flex",
                  alignItems: "center",
                  marginHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  style={[styles.callButton, { backgroundColor: "#01C2FF" }]}
                  onPress={() => Linking.openURL('tel:158')}
                >
                  <ImageWrapper source={require("../assets/police_icon.png")} resizeMode="stretch" style={{width: 30, height: 30, resizeMode: 'stretch'}} />
                </TouchableOpacity>
                <Text style={{ textAlign: "center", color: 'black' }}>Policie</Text>
              </View>
              <View
                style={{ width: 70, display: "flex", alignItems: "center" }}
              >
                <TouchableOpacity
                  style={[styles.callButton, { backgroundColor: "#FF9800" }]}
                  onPress={() => Linking.openURL('tel:150')}
                >
                  <ImageWrapper 
                  style={{width: 30, height: 30}}
                  resizeMode="stretch"
                  source={require("../assets/icon_firefighter.png")} />

                </TouchableOpacity>
                <Text style={{ textAlign: "center", color: 'black' }}>Hasiči</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View
                style={{ width: 70, display: "flex", alignItems: "center" }}
              >
                <TouchableOpacity
                  style={[styles.callButton, { backgroundColor: "#FFEB3B" }]}
                  onPress={() => Linking.openURL('tel:+420 261 104 333')}
                >
                  <ImageWrapper
                  resizeMode="stretch"
                    style={{width: 30, height: 15, resizeMode: 'stretch'}} 
                    source={require("../assets/icon_uamk.png")} />

                </TouchableOpacity>
                <Text style={{ textAlign: "center", color: 'black' }}>ÚAMK</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  callButton: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "green",
    elevation: 10,
    marginBottom: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CallDialog;
