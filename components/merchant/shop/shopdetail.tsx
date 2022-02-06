import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../../styles/common";
import ENDPOINTS from "../../../utils/endpoints";
import API from "../../../utils/api";


const MerchantShopDetail = () => {

    function sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms)); // sleep function to later use loading screen
    }

    const [shopId, setShopId] = useState("");
    const [items, setItems] = useState([]);
    useEffect(()=> {
        const shop = async () => {
            const shopid:any = await AsyncStorage.getItem("openedShopId");
            setShopId(shopid);
            await fetch(API + ENDPOINTS.ITEM_LIST + shopid).then(async (res) => {
                const items = await res.json();
                console.log("Shop Items : ", items);
            });
        }
        shop();
        sleep(1000); // to wait for above promise to resolve,, kyuki wada to ttot jata hai
    }, [shopId]);

    return (
        <View style={styles.container}>
            {shopId}        
        </View>
    );
}

export default MerchantShopDetail;