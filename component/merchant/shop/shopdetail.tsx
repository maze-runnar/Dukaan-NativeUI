import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../../styles/signup";


const MerchantShopDetail = () => {

    const [shopId, setShopId] = useState("");
    useEffect(()=> {
        const shop = async () => {
            const shopid:any = await AsyncStorage.getItem("openedShopId");
            setShopId(shopid);
        }
        shop();
    }, [shopId]);

    return (
        <View style={styles.container}>
            {shopId}        
        </View>
    );
}

export default MerchantShopDetail;