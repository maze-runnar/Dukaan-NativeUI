import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import currentUser from "../../auth/authmanager";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = (props:any) => <Avatar.Icon {...props} icon="shopping-outline" color="orange" style={{backgroundColor: 'purple'}}/>
const RightContentOpen = (props:any) => <div style={{backgroundColor:"#9be864", paddingLeft: '4px', paddingRight: '4px', borderRadius: '5px', marginRight: '3px'}}><Text>Open</Text></div>
const RightContentClosed = (props:any) => <div style={{backgroundColor:"#ff0000", paddingLeft: '4px', paddingRight: '4px', borderRadius: '5px', marginRight: '3px'}}><Text style={{color:"white"}}>Closed</Text></div>


                        
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
        <ScrollView>
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
                <ScrollView>
                    {["1", "2", "3", "2", "3", "2", "3", "2", "3"].map((item, index) => {
                        return (
                            <Card style={{margin: "2px", borderRadius:"10px"}}>
                                <Card.Title title="Shop Name" subtitle="Category" left={LeftContent} right={RightContentClosed}/>
                                <Card.Actions>
                                </Card.Actions>
                            </Card>
                        )
                    })}
                </ScrollView>
            }
        </ScrollView>
    );
};

export default NearShops;
