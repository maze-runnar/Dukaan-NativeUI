import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import MerchantSignUp from "./merchantsignup";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MerchantHome from "./merchanthome";

const Tab = createMaterialBottomTabNavigator();

function MerchantDashboard() {
    return (
        <Tab.Navigator activeColor="purple" barStyle={{ backgroundColor: "white" }}>
            <Tab.Screen
                name="Home"
                component={MerchantHome}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Khaata"
                component={MerchantSignUp}
                options={{
                    tabBarLabel: "Khaata",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="notebook" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Account"
                component={MerchantSignUp}
                options={{
                    tabBarLabel: "Account",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MerchantDashboard;