import React from 'react';
import Greeting from './component/welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserSignUp from './component/user/usersignup';
import UserLogin from './component/user/userlogin';
import MyTabs from './component/user/userdashboard';
import NearShops from './component/user/usernearshops';
import ShopDetails from './component/user/shopdetails';
import UserProfile from './component/user/userprofile';
import EditUserDetails from './component/user/edituserdetails';
import MerchantSignUP from './component/merchant/merchantsignup';
import MerchantLogin from './component/merchant/merchantlogin';
import MerchantDashboard from './component/merchant/merchantdashboard';
import MerchantHome from './component/merchant/merchanthome';
import RequiredMerchantInfo from './component/merchant/requiredinfo';
import AddItem from './component/merchant/shop/additem';
import AddShop from './component/merchant/addshop';
import MerchantShops from './component/merchant/merchantshops';
import MerchantShopDetail from './component/merchant/shop/shopdetail';

export type RootStackParamList = {
  Greeting: undefined;
  UserSignUp: undefined;
  UserLogin: undefined;
  NearShops: undefined;
  Dashboard: undefined;
  ShopDetails: undefined;
  UserProfile: undefined;
  EditUserDetails: undefined;
  MerchantSignUP: undefined;
  MerchantLogin: undefined;
  MerchantDashboard: undefined;
  MerchantHome: undefined;
  RequiredMerchantInfo: undefined;
  AddItem: undefined;
  AddShop: undefined;
  MerchantShops:undefined;
  MerchantShopDetail: undefined;
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
        <Stack.Screen name="ShopDetails" component={ShopDetails} initialParams={{itemId: 1}}/>
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="EditUserDetails" component={EditUserDetails} initialParams={{userId: 1}}/>
        <Stack.Screen name="MerchantSignUP" component={MerchantSignUP} />
        <Stack.Screen name="MerchantLogin" component={MerchantLogin} />
        <Stack.Screen name="MerchantDashboard" component={MerchantDashboard} />
        <Stack.Screen name="MerchantHome" component={MerchantHome} />
        <Stack.Screen name="RequiredMerchantInfo" component={RequiredMerchantInfo} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="AddShop" component={AddShop} />
        <Stack.Screen name="MerchantShops" component={MerchantShops} />
        <Stack.Screen name="MerchantShopDetail" component={MerchantShopDetail} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
