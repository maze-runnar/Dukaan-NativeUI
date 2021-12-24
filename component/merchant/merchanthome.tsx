import React, { useEffect, useState } from "react";
import MerchantNotify from "./notifications";
import { SafeAreaView, Text, View } from "react-native";
import RequiredMerchantInfo from "./requiredinfo";
import currentMerchant from "../../auth/merchantauthmanager";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";

const MerchantHome = () => {
    const [pincode, setPincode] = useState("");
    const [mobile, setMobile] = useState("");
    const [location, setLocation] = useState("");

    function sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const userValues = async () => {
            let x: any = await currentMerchant();
            const id: any = await AsyncStorage.getItem("userid");
            setPincode(x?.['data']['pincode']);
            await sleep(1000);
            setMobile(x?.['data']['mobile']);
            setLocation(x?.['data']['location']);
            console.log(x, "current user data for sesion");
        };
        userValues();
    }, [mobile, location]);

    //will use useeffect here to check if number, pincode and location is entered
    return (
        <SafeAreaView>
            {(location !== '' && mobile !== "" && pincode !== "") ?
                <View style={{ height: '50%' }}>
                    <MerchantNotify />
                </View> :
                <View>
                    <RequiredMerchantInfo />
                </View>
            }
        </SafeAreaView>
    );
}
export default MerchantHome;