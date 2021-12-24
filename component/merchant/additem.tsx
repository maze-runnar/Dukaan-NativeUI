import React, { useState } from "react";
import { View, Switch, TextInput, Text, Pressable } from 'react-native';
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddItem = () => {
    const [isAvailable, setisAvailable] = useState(true);
    const [itemName, setItemName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const toggleSwitch = () => setisAvailable(previousState => !previousState);

    const newItem = async () => {
        const merchantId: any = await AsyncStorage.getItem("userid");
        await fetch(API + ENDPOINTS.NEW_ITEM, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "allow-control-allow-origin": "*",
            },
            body: JSON.stringify({ name: itemName, is_available: isAvailable, merchant_id: merchantId }),
        })
            .then(async (data: any) => {
                console.log(data.status); // return 200, 403
                let x = await data.json();
                console.log("getting into then block", x);
            })
            .catch((e) => {
                console.log("getting an error", e);
            })
            .finally(() => {
                setItemName("");
                setErrorMsg("Item Added successfully");
                console.log("getting into finally block");
            });
    };



    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={setItemName}
                value={itemName}
                style={styles.input}
                placeholder="Item"
            />
            <Text>Is Available: </Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isAvailable ? "purple" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isAvailable}
            />
            <Pressable style={styles.ButtonStyle} onPress={() => newItem()}>
                <Text style={{ color: "purple" }}> Add Item </Text>
            </Pressable>
             
            <Text style={{color: "green"}}>{errorMsg}</Text>

        </View>
    );
}

export default AddItem;