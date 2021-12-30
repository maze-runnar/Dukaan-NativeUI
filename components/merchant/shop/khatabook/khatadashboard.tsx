import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Pressable, TextInput, AppRegistry, View, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../../../utils/api";
import ENDPOINTS from "../../../../utils/endpoints";
import { useNavigation } from "@react-navigation/native";

const KhataDashboard = () => {

  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [record, setrecord] = useState([]);

  function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const navigation = useNavigation();

  useEffect(() => {
    const khatarecords = async () => {
      const shopId: any = await AsyncStorage.getItem("openedShopId");
      fetch(API + ENDPOINTS.KHATA_LIST + shopId).then(async (res) => {
        const khataRecords = await res.json();
        console.log("current shop records: ", khataRecords);
        setrecord(khataRecords?.['data']);
      });
      await sleep(1000);
      // console.log(username, "current user data for sesion");
    };
    khatarecords();
    // setRefreshtime(refreshtime+1);

  }, []);


  return (
    <SafeAreaView>
        <Button
            onPress={() => {
                navigation.navigate('AddRecord');
            }}
            title="New Record"
            color="#800080">
        </Button>
      {record.map((x) =>
      <View key={x['id']} style={{height: "60", borderRadius: 10, padding: 10}}>
        <Text>{x?.['title']} </Text>
        <Text> marked paid: {x?.['mark_as_paid'] ? "Yes" : "No"} </Text>
        <Text> Description: {x?.['description']} </Text>
        <Text> Total Money: {x?.['total_money']} </Text>
      </View>
      )}
      
    </SafeAreaView>
  );
}

export default KhataDashboard;