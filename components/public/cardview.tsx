import React from "react";
import { Pressable, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { Avatar, Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CardView = (props: any) => {
  const navigation = useNavigation();
  const LeftContent = (props: any) => <Avatar.Icon {...props} icon="shopping-outline" color="#0320fc" style={{ backgroundColor: "white" }} />
  const RightContentClosed = (props: any) => <View style={{ paddingLeft: 4, paddingRight: 4, borderRadius: 5, marginRight: 3 }}><MaterialCommunityIcons name="arrow-right" size={20} style={{ color: 'grey' }} /></View>

  return (
    <Pressable onPress={() => {
      AsyncStorage.setItem("currentShopId", String(props.currentShop['id']));
      navigation.navigate('ShopDetails', { itemId: props.currentShop['id'] });
    }}
      style={{ alignItems: "center" }}>
      <Card style={{
        margin: 5, borderRadius: 10, shadowColor: '#e8e9ed',
        width: "95%",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.6,
        elevation: 5
      }}>
        <Card.Title title={props.currentShop?.['name']} subtitle={"📍: " + props.currentShop?.['location'] + "\n"
          + "☎️: " + props.currentShop?.['mobile'] + "\n" +
          "Time: " + props.currentShop?.['opening_time'] + " - " + props.currentShop?.['close_time']
        }

          left={LeftContent} right={RightContentClosed} />
      </Card>
    </Pressable>
  );
};

export default CardView;