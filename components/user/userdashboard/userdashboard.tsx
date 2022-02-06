import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import UserSignUp from "../usersignup/index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NearShops from "../usernearshops/usernearshops";
import UserProfile from "../userprofile/userprofile";

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator activeColor="purple" barStyle={{ backgroundColor: "#dbd5d5" }}>
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
                name="History"
                component={UserSignUp}
                options={{
                    tabBarLabel: "History",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bookmark" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Account"
                component={UserProfile}
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