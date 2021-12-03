import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import UserSignUp from "./usersignup";
import UserLogin from "./userlogin";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator activeColor="purple" barStyle={{ backgroundColor: "white" }}>
            <Tab.Screen
                name="Home"
                component={UserSignUp}
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
                        <MaterialCommunityIcons name="book" color={color} size={26} />
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
