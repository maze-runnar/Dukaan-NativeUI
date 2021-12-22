import React from "react";
import MerchantNotify from "./notifications";
import { SafeAreaView, Text, View } from "react-native";


const MerchantHome = () => {
    return (
        <SafeAreaView>
            <View style={{height: '50%'}}>
                <MerchantNotify />
            </View>
        </SafeAreaView>
    );
}
export default MerchantHome;