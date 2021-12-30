import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Pressable, TextInput, AppRegistry, View, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "MerchantShops">;

const MerchantShops = ({ route, navigation }: Props) => {
  const nav = useNavigation();
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [shop, setShop] = useState([]);

  function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const merchantShops = async () => {
      const id: any = await AsyncStorage.getItem("merchantid");
      fetch(API + ENDPOINTS.SHOP_LIST + id).then(async (res) => {
        const itemData = await res.json();
        console.log("Shops for a merchant: ", itemData);
        setShop(itemData?.['data']);
      });
      await sleep(1000);
      console.log(username, "current user data for sesion");
    };
    merchantShops();
    // setRefreshtime(refreshtime+1);

  }, [navigation]);

  const openShop = async (id:any) => {
    await AsyncStorage.setItem("openedShopId", id);
    nav.navigate("ShopDashboard");
  }

  return (
    <SafeAreaView>
      {shop.map((x) => 
      <View style={{height: "60", borderRadius: 10, padding: 10}}>
        <Text>{x?.['name']} </Text>
        <Text> {x?.['id']} {x?.['mobile']} {x?.['description']} {x?.["pincode"]}<br /> </Text>
        <Pressable onPress={() => {
              openShop(x['id'])
            }}
        >
          Open
        </Pressable>
      </View>
      )}
    </SafeAreaView>
  );
}

export default MerchantShops;