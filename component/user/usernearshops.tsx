import React, { useEffect, useState } from "react";
import { View, Button, Text, TextInput, Pressable, SafeAreaView, ScrollView, ImageBackground, SliderComponent } from "react-native";
import currentUser from "../../auth/authmanager";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="shopping-outline" color="orange" style={{ backgroundColor: 'purple' }} />
const RightContentOpen = (props: any) => <div style={{ backgroundColor: "#9be864", paddingLeft: '4px', paddingRight: '4px', borderRadius: '5px', marginRight: '3px' }}><Text>Open</Text></div>
const RightContentClosed = (props: any) => <div style={{ backgroundColor: "#ff0000", paddingLeft: '4px', paddingRight: '4px', borderRadius: '5px', marginRight: '3px' }}><Text style={{ color: "white" }}>Closed</Text></div>

type Props = NativeStackScreenProps<RootStackParamList, "NearShops">;


const NearShops = ({ navigation }: Props) => {
    const [username, setUsername] = useState("");
    const [userid, setUserId] = useState("");
    const [pincode, setPincode] = useState("");
    const [currentPincode, setCurrentPincode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [nearbyShops, setnearbyShops] = useState([]);

    function sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const userValues = async () => {
            let x: any = await currentUser();
            const id: any = await AsyncStorage.getItem("userid");
            fetch(API + ENDPOINTS.NEAR_BY_SHOPS + id).then(async (res) => {
                const nearshops = await res.json();
                setnearbyShops(nearshops['data']);
                console.log("Shops: ", nearbyShops);
            });
            setCurrentPincode(x?.['data']['pincode']);
            await sleep(1000);
            setUsername(x?.['data']['username']);
            setUserId(id);
            console.log(username, "current user data for sesion");
        };
        userValues();
        // const fetchNearShops = async () => { 
        //     const id: any = await AsyncStorage.getItem("userid");

        // };
        // fetchNearShops();
    }, [userid, currentPincode]);
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
                    {nearbyShops.map((x) => {
                        return (
                            <Card style={{
                                margin: "5px", borderRadius: "10px", shadowColor: '#ffff00',
                                shadowOffset: { width: 0, height: 10 },
                                shadowOpacity: 0.4,
                                elevation: 1
                            }}>
                                <Card.Title title="Shop Name" subtitle={"📍: " + x['location'] + "\n" + "☎️: " + x['mobile']} left={LeftContent} right={RightContentClosed} />
                                <Button
                                    onPress={() => {
                                        navigation.navigate('ShopDetails', { itemId: x['id'] });
                                    }}
                                    title="View"
                                    color="#800080">
                                </Button>
                            </Card>
                        )
                    })}
                </ScrollView>
            }
        </ScrollView>
    );
};

export default NearShops;
