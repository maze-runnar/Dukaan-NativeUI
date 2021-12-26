import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Pressable, TextInput, AppRegistry, View, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../utils/api";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MerchantNotify = () => {

  const [username, setUsername] = useState("");
  const [refreshtime, setRefreshtime] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [notification, setNotification] = useState([]);

  function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const userValues = async () => {
      const id: any = await AsyncStorage.getItem("userid");
      fetch(API + "/api/v1/notification/" + id).then(async (res) => {
        const notificationData = await res.json();
        console.log("Notifications: ", notificationData);
        setNotification(notificationData?.['data']);
      });
      console.log(username, "current user data for sesion");
    };
    userValues();
    setInterval(() => setRefreshtime(refreshtime + 1), 60000); // refresh time is 20 seconds
    // setRefreshtime(refreshtime+1);
  }, []);


  return (
    <SafeAreaView>
      {/* {notification.map((x) => <Text>{x?.['msg']} <br /> </Text>)} */}
      <FlatList
        data={notification}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 10,
              backgroundColor: "#38a3f5",
              height: 20,
              width: 250,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',  
              padding: 20,
              margin: 20         
            }}>
            <Text>{item.msg}</Text>
          </View>
        )}
        //Setting the number of column
        numColumns={1}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
}

export default MerchantNotify;