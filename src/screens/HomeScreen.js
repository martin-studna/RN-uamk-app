import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors.js";
import MenuButton from "../components/MenuButton.js";

const posts = [];

export default class HomeScreen extends React.Component {
  renderPost = (post) => {
    return (
      <View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>

            <Ionicons name="ios-more" size={24} color="#73788B" />
          </View>

          <Text style={styles.post}>{post.text}</Text>

          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="cover"
          />

          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-heart-empty"
              size={24}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
            <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
          </View>
        </View>
      </View>
    );
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;

    this.setState({ email, displayName });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <MenuButton navigation={this.props.navigation} style={styles.menu} />
          <Text style={styles.headerTitle}>Zíráním nepomůžeš</Text>
        </View>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/backgroundimage_zoom.png")}
        >
          <FlatList
            style={styles.feed}
            data={posts}
            renderItem={({ item }) => this.renderPost(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  menu: {
    marginLeft: 42,
  },
  header: {
    height: 80,
    paddingLeft: 16,
    paddingTop: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    borderBottomColor: "#EBECF4",
    borderBottomWidth: 1,
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
    flexDirection: "row",
  },
  headerTitle: {
    color: colors.uamkBlue,
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 16,
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 9,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
