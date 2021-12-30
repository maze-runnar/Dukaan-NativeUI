import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Pressable, TextInput, AppRegistry, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../../utils/api";
import ENDPOINTS from "../../../utils/endpoints";

const ShopItems = () => {

  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [item, setItem] = useState([]);

  function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const merchantItems = async () => {
      const shopId: any = await AsyncStorage.getItem("openedShopId");
      fetch(API + ENDPOINTS.ITEM_LIST + shopId).then(async (res) => {
        const itemData = await res.json();
        console.log("current shop items: ", itemData);
        setItem(itemData?.['data']);
      });
      await sleep(1000);
      // console.log(username, "current user data for sesion");
    };
    merchantItems();
    // setRefreshtime(refreshtime+1);

  }, []);


  return (
    <SafeAreaView>
      {item.map((x) =>
      <View style={{height: "60", borderRadius: 10, padding: 10}}>
        <Text>{x?.['name']} </Text>
        <Text> Available: {x?.['is_available'] ? "Yes" : "No"} </Text>
        <Text> Min Order Amount: {x?.['min_order_amount']} </Text>
        <Text> Max Order Amount: {x?.['max_order_amount']} </Text>
        <Text> Description: {x?.['description']} </Text>
      </View>
      )}
      
    </SafeAreaView>
  );
}

export default ShopItems;