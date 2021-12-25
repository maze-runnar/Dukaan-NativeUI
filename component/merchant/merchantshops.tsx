import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Pressable, TextInput, AppRegistry, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";

const MerchantShops = () => {

  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [shop, setShop] = useState([]);

  function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const merchantShops = async () => {
      const id: any = await AsyncStorage.getItem("userid");
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

  }, []);


  return (
    <SafeAreaView>
      {shop.map((x) => 
      <View>
        <Text>{x?.['name']}  {x?.['mobile']} {x?.['description']} {x?.["pincode"]}<br /> </Text>
        <Text>Open this shop workspace..</Text>
      </View>
      )}
    </SafeAreaView>
  );
}

export default MerchantShops;