import React, { useEffect, useState } from "react";
import MerchantNotify from "./notifications";
import { Button, SafeAreaView, Text, View } from "react-native";
import RequiredMerchantInfo from "./requiredinfo";
import currentMerchant from "../../auth/merchantauthmanager";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MerchantShops from "./merchantshops";


type Props = NativeStackScreenProps<RootStackParamList, "MerchantHome">;


const MerchantHome = ({ navigation }: Props) => {
    const [pincode, setPincode] = useState("");
    const [mobile, setMobile] = useState("");
    const [location, setLocation] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    function sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const userValues = async () => {
            let x: any = await currentMerchant();
            const id: any = await AsyncStorage.getItem("merchantid");
            setPincode(x?.['data']['pincode']);
            await sleep(1000);
            setMobile(x?.['data']['mobile']);
            setLocation(x?.['data']['location']);
            console.log(x, "current user data for sesion");
        };
        userValues();
        if((location !== '' && location !== null && location !== undefined) && (!!mobile && mobile !== "") && pincode !== "") {
            setIsLoading(false);
        }
    }, [mobile, location, navigation]);

    //will use useeffect here to check if number, pincode and location is entered
    return (
        <SafeAreaView>
            {isLoading ? "loading.." : "loaded.."}
            {((location !== '' && location !== null && location !== undefined) && (!!mobile && mobile !== "") && pincode !== "") ?
                <View style={{ height: '50%' }}>
                    <MerchantNotify />
                    <Button
                        onPress={() => {
                            navigation.navigate('AddShop');
                        }}
                        title="New Shop +"
                        color="#800080"
                    >
                    </Button>
                    <Text style={{ fontSize: 20 }}>Shops: </Text>
                    <MerchantShops />
                </View> :
                <View>
                    <Text style={{color:"red"}}>Fill required Info info to proceed...</Text>
                    <Button
                        onPress={() => {
                            navigation.navigate('RequiredMerchantInfo');
                        }}
                        title="Click Here"
                        color="#800080">
                    </Button>
                </View>
            }
        </SafeAreaView>
    );
}
export default MerchantHome;