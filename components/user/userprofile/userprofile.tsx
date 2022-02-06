import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, Pressable, TextInput, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../../styles/common";
import API from "../../../utils/api";
import ENDPOINTS from "../../../utils/endpoints";
import response from "../../../utils/data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import currentUser from "../../../auth/authmanager";
import InitialIcon from "../../public/initialicon";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


type Props = NativeStackScreenProps<RootStackParamList, "UserProfile">;


const UserProfile = ({ route, navigation }: Props) => {
    // const { userId } = route.params;
    const [username, setUsername] = useState("");
    const [userid, setUserId] = useState("");
    const [pincode, setPincode] = useState("");
    const [location, setLocation] = useState("Add location");
    const [mobile, setMobile] = useState("Add mobile no.");
    const [personalNote, setpersonalNote] = useState("");
    const [name, setName] = useState("");

    function sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const userValues = async () => {
            let x: any = await currentUser();
            const id: any = await AsyncStorage.getItem("userid");
            sleep(1000);
            setUsername(x?.['data']?.['username']);
            setPincode(x?.['data']['pincode']);
            setMobile(x?.['data']['mobile']);
            setLocation(x?.['data']['location']);
            setpersonalNote(x?.['data']['personal_note']);
            setName(x?.['data']['name']);
            setUserId(id);
        };
        userValues();
    }, [username, mobile, location, pincode, navigation, name]);

    return (
        <ScrollView>
            <View style={{
                backgroundColor: '#000000',
                width: '100%',
                height: 100
            }}>
            </View>
            <View style={{ width: "100%", height: 5, backgroundColor: "#db7d02" }}></View>
            <InitialIcon name={username} />
            <View style={{
                margin: "auto", alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ textTransform: "uppercase", fontWeight: "200", fontSize: 25 }}>{name}</Text>
            </View>
            <View style={{ margin: 5 }}>
                <Text style={{ color: 'gray', fontSize: 17 }}>
                    <MaterialCommunityIcons name="map-marker-multiple" size={18} />
                    {location} ,Pincode: {pincode} </Text>
                <Text style={{ color: 'gray', fontSize: 17 }}>
                    <MaterialCommunityIcons name="phone" size={18} />
                    {mobile}</Text>
                {/* add personal note from database here */}
                <Text style={{ color: 'gray', fontSize: 17 }}>
                    {personalNote}</Text>
            </View>
            <View style={styles.statscontainer} >
                <View style={styles.statsbox}>
                    <Button
                        onPress={() => {
                            navigation.navigate('EditUserDetails', { itemId: userid });
                        }} icon="pencil"
                        mode="contained"
                        color="#800080">
                        <Text style={{ color: "white" }} >Edit Profile</Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};

export default UserProfile;