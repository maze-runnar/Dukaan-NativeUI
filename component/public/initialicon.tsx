import React from "react";
import { SafeAreaView, Text, Pressable, TextInput, View } from "react-native";

const InitialIcon = ({ name }:any) => {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
    if(!name) {
        name = "XX YY";
    }
    let initials = [...name.matchAll(rgx)] || [];

    initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();

    return (
      <View
        style={{
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          width: 50,
          height: 50,
        }}>
        <Text style={{ color: 'white', fontSize: 25 }}>{initials}</Text>
      </View>
    );
  };

  export default InitialIcon;