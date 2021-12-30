import React, { useState } from "react";
import { View, Switch, TextInput, Text, Pressable } from 'react-native';
import styles from "../../../../styles/signup";
import API from "../../../../utils/api";
import ENDPOINTS from "../../../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRecord = () => {
    const [title, setTitle] = useState("");
    // const [shopId, setShopId] = useState("");
    // const [MerchantId, setMerchantId] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [payerName, setPayerName] = useState("");
    const [description, setDescription] = useState("");
    const [totalMoney, setTotalMoney] = useState("");
    const [paidMoney, setPaidMoney] = useState("");
    const [markedAsPaid, setMarkedAsPaid] = useState(false);



    const toggleSwitch = () => setMarkedAsPaid(previousState => !previousState);

    const newRecord = async () => {
        const shopId: any = await AsyncStorage.getItem("openedShopId");
        const merchantId: any = await AsyncStorage.getItem("merchantid");
        await fetch(API + ENDPOINTS.NEW_KHATA_RECORD, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "allow-control-allow-origin": "*",
            },
            body: JSON.stringify({ title: title, payer_name: payerName, shop_id: shopId, description: description, merchant_id: merchantId, total_money: parseInt(totalMoney), paid_money: parseInt(paidMoney), mark_as_paid: markedAsPaid }),
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
                setErrorMsg("Item Added successfully");
                console.log("getting into finally block");
            });
    };



    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={setTitle}
                value={title}
                style={styles.input}
                placeholder="Title"
            />
            <TextInput
                onChangeText={setPayerName}
                value={payerName}
                style={styles.input}
                placeholder="Payer Name"
            />
            <TextInput
                onChangeText={setDescription}
                value={description}
                style={styles.input}
                multiline={true}
                numberOfLines={7}
                placeholder="Description"
            />
            <TextInput
                onChangeText={setTotalMoney}
                value={totalMoney}
                style={styles.input}
                placeholder="Total Money"
            />
            <TextInput
                onChangeText={setPaidMoney}
                value={paidMoney}
                style={styles.input}
                placeholder="Paid Money"
            />
            
            <Text>Mark As Paid: </Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={markedAsPaid ? "purple" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={markedAsPaid}
            />
            <Pressable style={styles.ButtonStyle} onPress={() => newRecord()}>
                <Text style={{ color: "purple" }}> Add Record </Text>
            </Pressable>
             
            <Text style={{color: "green"}}>{errorMsg}</Text>

        </View>
    );
}

export default AddRecord;