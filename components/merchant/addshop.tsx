import React, { useState } from "react";
import { View, Switch, TextInput, Text, Pressable } from 'react-native';
import styles from "../../styles/common";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddShop = () => {
    const [name, setName] = useState("");
    const [items, setItems] = useState("");
    const [pincode, setPincode] = useState("");
    const [mobile, setMobile] = useState("");
    const [location, setLocation] = useState("");
    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");
    const [description, setDescription] = useState("");
    const [homeDeliveryAvailable, setHomeDeliveryAvailable] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const toggleSwitch = () => setHomeDeliveryAvailable(previousState => !previousState);

    const newShop = async () => {
        const merchantId: any = await AsyncStorage.getItem("merchantid");
        await fetch(API + ENDPOINTS.NEW_SHOP, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "allow-control-allow-origin": "*",
            },
            body: JSON.stringify({ name: name, merchant_id: merchantId, pincode: pincode, mobile: mobile, location: location, opening_time: openingTime, closing_time: closingTime, description: description, home_delivery_available: homeDeliveryAvailable }),
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
                setErrorMsg("Shop Added successfully!! go back or add another.");
                console.log("getting into finally block");
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={setName}
                value={name}
                style={styles.input}
                placeholder="Shop"
            />
            <TextInput
                onChangeText={setPincode}
                value={pincode}
                style={styles.input}
                placeholder="Pincode"
            />
            <TextInput
                onChangeText={setMobile}
                value={mobile}
                style={styles.input}
                placeholder="Mobile"
            />
            <TextInput
                onChangeText={setLocation}
                value={location}
                style={styles.input}
                placeholder="Location"
            />
            <TextInput
                onChangeText={setOpeningTime}
                value={openingTime}
                style={styles.input}
                placeholder="Opening time"
            />
            <TextInput
                onChangeText={setClosingTime}
                value={closingTime}
                style={styles.input}
                placeholder="Closing time"
            />
            <TextInput
                onChangeText={setDescription}
                value={description}
                style={styles.input}
                placeholder="Description.."
            />
            <Text>Home Delivery Available: </Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={homeDeliveryAvailable ? "purple" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={homeDeliveryAvailable}
            />
            <Pressable style={styles.ButtonStyle} onPress={() => newShop()}>
                <Text style={{ color: "purple" }}> Add Shop </Text>
            </Pressable>
             
            <Text style={{color: "green"}}>{errorMsg}</Text>

        </View>
    );
}

export default AddShop;