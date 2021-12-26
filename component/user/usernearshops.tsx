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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="shopping-outline" color="orange" style={{ backgroundColor: 'purple' }} />
const RightContentOpen = (props: any) => <div style={{ backgroundColor: "#9be864", paddingLeft: '4px', paddingRight: '4px', borderRadius: '5px', marginRight: '3px' }}><Text>Open</Text></div>
const RightContentClosed = (props: any) => <div style={{ backgroundColor: "#ff0000", paddingLeft: '4px', paddingRight: '4px', borderRadius: '5px', marginRight: '3px' }}><Text style={{ color: "white" }}>Closed</Text></div>

type Props = NativeStackScreenProps<RootStackParamList, "NearShops">;


const NearShops = ({ navigation }: Props) => {
    const [username, setUsername] = useState("");
    const [userid, setUserId] = useState("");
    const [pincode, setPincode] = useState("");
    const [currentPincode, setCurrentPincode] = useState(""); //let's say we need opening_time info here
    const [openingTime, setOpeningTime] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [nearbyShops, setnearbyShops] = useState([]); // using states in functional component

    function sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms)); // sleep function to later use loading screen
    }

    useEffect(() => { // lifecycle in funcional component 
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
            setOpeningTime(x?.['data']['opening_time']) // now where data came from, opening_time is key of that dictionary 
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
                setErrorMsg("pincode updated successfully."); //this is to set the error/success msg that any event is completed
            }
        })
    }
    return (
        <ScrollView>
                <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator ={false}>

                <View style={styles.cardcenters}>
                    <MaterialCommunityIcons name="dresser" size={26} />
                        <Text> All </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="food" size={26} />
                    <Text> Grocery </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="bag-checked" size={26} />
                    <Text> Fashion </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="electric-switch" size={26} />
                    <Text> Electronics </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="medical-bag" size={26} />
                    <Text> Medical </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="star-face" size={26} />
                    <Text> Beauty </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="pinwheel" size={26} />
                    <Text> Toy </Text>
                </View>

                </ScrollView>
                <ScrollView>
                    {nearbyShops.map((x) => {
                        return (
                            <Card style={{margin: "5px", borderRadius:"10px", shadowColor: '#ffff00',
                            shadowOffset: {width: 0, height: 5},
                            shadowOpacity: 0.4,
                            elevation: 1}}>
                                <Card.Title title="Shop Name" subtitle={"📍: "+x['location']+ "\n" +"☎️: " + x['mobile']} left={LeftContent} right={RightContentClosed}/>
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
        </ScrollView>
    );
};

export default NearShops;
