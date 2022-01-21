import React from "react";
import { SafeAreaView, Text, Pressable, TextInput, View } from "react-native";

const InitialIcon = ({ name }: any) => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  if (!name || name === '' || name === null || name === undefined) {
    name = "AA";
  }

  let initial = name[0];

  return (
    <View
      style={{
        marginTop: -50,
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
      <Text style={{ color: 'white', fontSize: 55 }}>{initial}</Text>
    </View>
  );
};

export default InitialIcon;