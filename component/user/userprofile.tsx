import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Pressable, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
import response from "../../utils/data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import  currentUser from "../../auth/authmanager";
import InitialIcon from "../public/initialicon";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


type Props = NativeStackScreenProps<RootStackParamList, "UserProfile">;


const UserProfile = ({ route, navigation } : Props) => {
	// const { userId } = route.params;
    const [username, setUsername] = useState("");
    const [userid, setUserId] = useState("");
    const [pincode, setPincode] = useState("");
    const [location, setLocation] = useState("Add location");
    const [mobile, setMobile] = useState("Add mobile no.");
    const [personalNote, setpersonalNote] = useState("");


    function sleep(ms:any) {
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
            setUserId(id);
        };
        userValues();  
    }, [username, mobile, location, pincode]);
    
    return (
		<SafeAreaView style={styles.container}>
            <Text>{pincode} </Text><Text>{mobile}</Text>
            <Text>{location} </Text>
            <InitialIcon name={username}/>
            <Button onPress={() => {
                navigation.navigate('EditUserDetails', {itemId: userid });
                }}> 
                <Text>Edit Profile </Text>
            </Button>
		</SafeAreaView>	
		);
};

export default UserProfile;
