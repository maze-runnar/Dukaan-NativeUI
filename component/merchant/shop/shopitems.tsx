import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Pressable, TextInput, AppRegistry } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../../utils/api";

const ShopItems = () => {

  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [item, setItem] = useState([]);

  function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const merchantItems = async () => {
      const id: any = await AsyncStorage.getItem("userid");
      fetch(API + "/api/v1/merchantitem/" + id).then(async (res) => {
        const itemData = await res.json();
        console.log("Notifications: ", itemData);
        setItem(itemData?.['data']);
      });
      await sleep(1000);
      console.log(username, "current user data for sesion");
    };
    merchantItems();
    // setRefreshtime(refreshtime+1);

  }, []);


  return (
    <SafeAreaView>
      {item.map((x) => <Text>{x?.['name']} Available: {x?.['is_available'] ? "Yes" : "No"}<br /> </Text>)}
    </SafeAreaView>
  );
}

export default ShopItems;