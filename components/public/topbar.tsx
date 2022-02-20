import React from "react";
import { SafeAreaView, Text, Pressable, View} from "react-native";
import { Avatar, Card } from "react-native-paper";

const Topbar = (props: any) => {
    return (
                <View style={{height:50, backgroundColor:'white', padding:10}}>
                    <Text style={{ fontSize:20 , fontWeight:'bold',fontFamily:'Simplifica' }} >
                    🛍️ {props.name}</Text>
                    <Text style={{ fontSize:10 , fontWeight:'bold',fontFamily:'Simplifica', marginLeft:32 }} >
                    {props.address}</Text>
                </View>
    );
            
};


export default Topbar;