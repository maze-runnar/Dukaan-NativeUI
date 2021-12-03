import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  ButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    borderColor: "#eba315",
    color: "#eba315",
    borderWidth: 2,
    width: "90%",
    bottom: 0,
    top: "10%",
  },
  ImageStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    bottom: 20,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Greeting = (props: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/small-logo.png")}
        style={styles.ImageStyle}
      />
      <Text style={{ color: "#eba315", display: "none" }}>
        Find your favorite nearest place and choose the best deals for you. Get
        notified where your product is available. And save time in searching for
        the deals from shop to shop.
      </Text>
      <Pressable
        style={styles.ButtonStyle}
        onPress={() => console.log("User pressed pressable")}
      >
        <Text style={{ color: "purple" }}> MERCHANT </Text>
      </Pressable>
      <br />
      <Pressable
        style={styles.ButtonStyle}
        onPress={() => navigation.navigate("UserSignUp")}
      >
        <Text style={{ color: "purple" }}> USER </Text>
      </Pressable>
    </View>
  );
};

export default Greeting;
