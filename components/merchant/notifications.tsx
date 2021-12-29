import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Pressable, TextInput, AppRegistry, View, FlatList, Dimensions } from "react-native";
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

  const { width, height } = Dimensions.get('window');

  return (
    <SafeAreaView>
      {/* {notification.map((x) => <Text>{x?.['msg']} <br /> </Text>)} */}
      <Text>Notifications: </Text>
      <FlatList
        data={notification}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 5,
              backgroundColor: item.is_read ? "#f5eeed" : "#38a3f5",
              height: 20,
              width: width - 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',  
              padding: 10,
            }}>
            <Text>
              {/* <MaterialCommunityIcons name="bell" size={10} />  */}
              {item.msg}
            </Text>
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