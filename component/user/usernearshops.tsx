import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, SafeAreaView, AppRegistry } from "react-native";
import currentUser from "../../auth/authmanager";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';


const NearShops = () => {
    const [username, setUsername] = useState("");
    const [userid, setUserId] = useState("");
    const [pincode, setPincode] = useState("");
    const [currentPincode, setCurrentPincode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const userValues = async () => {
            let x: any = await currentUser();
            setUsername(x?.['data']['username']);
            const id: any = await AsyncStorage.getItem("userid");
            setUserId(id);
            setCurrentPincode(x?.['data']['pincode']);
            console.log(username, "current user data for sesion");
        };
        userValues();
    });
    const savePincode = () => {
        console.log(pincode, userid);
        fetch(API + ENDPOINTS.USER_DETAIL + userid, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "allow-control-allow-origin": "*",
            },
            body: JSON.stringify({ pincode: pincode }),
        }).then((res) => {
            if (res.status === 200) {
                setErrorMsg("pincode updated successfully.")
            }
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            {currentPincode === null || currentPincode === "" ?
                <View style={styles.container}>
                    <Text>Please Enter your pincode manually or allow location access.</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPincode}
                        placeholder="Pincode"
                        value={pincode}
                    />
                    <Pressable style={styles.ButtonStyle} onPress={() => savePincode()}>
                        <Text style={{ color: "purple" }}> save </Text>
                    </Pressable>
                    <small style={{ color: "green" }}> {errorMsg} </small>
                </View> :
                <View>
                    <Text>
                        DashBoard <br />
                        NearBY Shops <br />
                    </Text>
                </View>
            }
        </SafeAreaView>
    );
};

export default NearShops;
