import React, {useEffect, useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  Pressable,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import styles from '../../../styles/signup';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const ShopDashboard = () => {
  const [dataSource, setDataSource] = useState([]);

  const navigation= useNavigation();

  useEffect(() => {
    let items = [{
      id: 1,
      color: "red",
      text: "Notifications",
      icon: "bell-outline",
      location: "",
    },
    {
      id: 2,
      color: "green",
      text: "Items",
      icon: "cart-outline",
      location: "MerchantShopDetail"
    },
    {
      id: 3,
      color: "blue",
      text: "Details",
      icon: "information-outline",
      location:"MerchantShopDetail"
    },
    {
      id: 1,
      color: "orange",
      text: "Khata",
      icon: "notebook-outline",
      location: "MerchantShopDetail"
    }]
    setDataSource(items);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataSource}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.location)}
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 10,
              backgroundColor: item.color,
              height: 200,
              width: 150,
              borderRadius: 10,   
              justifyContent: 'center',
              alignItems: 'center',           
            }}>
            <MaterialCommunityIcons name={item.icon} size={26} />
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};
export default ShopDashboard;