import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../colors";
import Fire from "../Fire";

const NotificationCard = (props) => {

  const [publisher, setPublisher] = useState('');
  const [publisherImage, setPublisherImage] = useState(null)

  useEffect(() => {
    Fire.shared.getUserByIdAsync(props.publisher).then((res) => {
      setPublisher(res.data().username);
      setPublisherImage(res.data().image);
    });
  }, []);

  const getDate = (timestamp) => {
    const currentDate = new Date();
    const passedTime = (currentDate.getTime() - timestamp) / 1000;

    if (passedTime < 60) return "Právě teď";
    if (passedTime / 60 < 60) return `${Math.floor(passedTime / 60)} min`;
    if (passedTime / (60 * 60) < 24)
      return `${Math.floor(passedTime / (60 * 60))} hod`;

    return `${Math.floor(passedTime / (60 * 60 * 24))} d`;
  };

  return (
    <View style={styles.postContainer}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ margin: 20, flexDirection: "row" }}>
            <View>
              <View
                style={{
                  borderRadius: 100,
                  width: 50,
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/uamk_logo.png")}
                  style={{ width: 27, height: 27, resizeMode: "contain" }}
                />
              </View>
              <Text style={styles.timestamp}>{getDate(props.timestamp)}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", marginLeft: 10 }}>UAMK</Text>
            </View>
          </View>
        </View>

        {props.text ? <Text style={styles.post}>{props.text}</Text> : null}
        <View style={{ flexDirection: "row" }}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 22,
    borderColor: '#ccc',
    borderWidth: 1.5,
    marginHorizontal: 5,
  },
  header : {

  },
  post: {
    marginLeft: 16,
    marginRight: 16,
    fontSize: 14,
    marginBottom: 15,
  },
  timestamp: {
    marginTop: 8,
    marginLeft: 2,
    fontWeight: "bold",
    color: "#838899",
    fontSize: 12,
    textAlign: "center",
  },
  more: {
    display: "none",
    marginRight: 16,
  },
  postImage: {
    width: "100%",
    height: 175,
    marginVertical: 16,
  },
  type: {
    borderRadius: 100,
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginRight: 15,
  },
});

export default NotificationCard;
