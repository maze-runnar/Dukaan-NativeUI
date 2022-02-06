import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import styles from "../styles/common";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, "UserLogin">;

const Greeting = ({ route, navigation }: Props) => {
  // const navigation = useNavigation();
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
        style={styles.GreetingButtonStyle}
        onPress={async() => {
          const merchantid= await AsyncStorage.getItem("merchantid");
          merchantid !== "" && merchantid !== null && merchantid !== undefined ? navigation.navigate("MerchantDashboard") : navigation.navigate("MerchantSignUP")}}
      >
        <Text style={{ color: "purple" }}> MERCHANT </Text>
      </Pressable>
      <Pressable
        style={styles.GreetingButtonStyle}
        onPress={async() => {
          const userid= await AsyncStorage.getItem("userid");
          userid !== "" && userid !== null && userid !== undefined ? navigation.navigate("Dashboard") : navigation.navigate("UserLogin")}}
        >
        <Text style={{ color: "purple" }}> USER </Text>
      </Pressable>
    </View>
  );
};

export default Greeting;
