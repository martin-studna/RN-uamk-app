import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";

const PointsDialog = (props) => {
  return (
    <Modal transparent visible={props.visible}>
      <View
        style={[
          styles.container,
          { backgroundColor: props.color ? props.color : "rgba(0,0,0,0.5)" },
        ]}
      >
        <View
          style={{ borderRadius: 25, backgroundColor: "white", padding: 25, display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          {props.text ? <Text style={{ fontSize: 20, fontWeight: "500",  color: "black" }}>
            {props.text}
          </Text> : null}
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
});

export default PointsDialog;
