import React from "react";
import { SafeAreaView, Text, Pressable, TextInput, View } from "react-native";

const InitialIcon = ({ name }: any) => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  if (!name) {
    name = "XX YY";
  }
  let initials = [...name.matchAll(rgx)] || [];

  initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();

  return (
    <View
      style={{
        marginTop: '-50px',
        margin: 'auto',
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        borderStyle: "solid",
        borderWidth: 5,
        borderColor: '#db7d02',
        width: 100,
        height: 100
      }}>
      <Text style={{ color: 'white', fontSize: 55 }}>{initials}</Text>
    </View>
  );
};

export default InitialIcon;