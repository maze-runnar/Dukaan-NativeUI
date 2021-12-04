import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import UserSignUp from "./usersignup";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NearShops from "./usernearshops";
import { AppRegistry } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator activeColor="purple" barStyle={{ backgroundColor: "white" }}>
            <Tab.Screen
                name="Home"
                component={NearShops}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Khaata"
                component={UserSignUp}
                options={{
                    tabBarLabel: "Khaata",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="notebook" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Account"
                component={UserSignUp}
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

export default MyTabs;