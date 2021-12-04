import React from 'react';
import Greeting from './component/welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserSignUp from './component/user/usersignup';
import UserLogin from './component/user/userlogin';
import MyTabs from './component/user/userdashboard';
import NearShops from './component/user/usernearshops';
import { AppRegistry, View } from 'react-native';

export type RootStackParamList = {
  Greeting: undefined;
  UserSignUp: undefined;
  UserLogin:undefined;
  NearShops: undefined;
  Dashboard: undefined;
};


export default function DukaanUI() {
  
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Greeting">
        <Stack.Screen name="Greeting" component={Greeting} />
        <Stack.Screen name="UserSignUp" component={UserSignUp} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="Dashboard" component={MyTabs} />
        <Stack.Screen name="NearShops" component={NearShops} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
