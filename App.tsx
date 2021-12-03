import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Greeting from './component/welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserSignUp from './component/user/usersignup';
import UserLogin from './component/user/userlogin';
import MyTabs from './component/user/userdashboard';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Begin" component={Greeting} />
        <Stack.Screen name="UserSignUp" component={UserSignUp} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="Dashboard" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
