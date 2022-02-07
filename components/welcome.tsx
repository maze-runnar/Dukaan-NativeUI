import React, {useState, useCallback, useEffect} from "react";
import { View, Text, Pressable, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import styles from "../styles/common";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {purple50} from "react-native-paper/lib/typescript/styles/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


type Props = NativeStackScreenProps<RootStackParamList, "UserLogin">;

const Greeting = ({ route, navigation }: Props) => {
  // const navigation = useNavigation();
    const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

      const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="shopping-search" color="purple" size={70} />
            <Text style={{color: "purple"}}>Welcome to DukaanPe  <Entypo name="rocket" size={20} color="purple"/> </Text>
        </View>
    );
  }

  return (
    <View style={styles.container}  onLayout={onLayoutRootView}>
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
