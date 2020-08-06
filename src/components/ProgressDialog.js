import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";

const ProgressDialog = (props) => {
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
          {props.title ? <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 20, color: "black" }}>
            {props.title}
          </Text> : null}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large"  />
            {props.text ? <Text style={{ marginLeft: 10, color: 'black' }}>{props.text}</Text> : null}
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
});

export default ProgressDialog;
