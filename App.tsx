import React from 'react';
import Greeting from './components/welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserSignUp from './components/user/usersignup/index';
import UserLogin from './components/user/userlogin/index';
import MyTabs from './components/user/userdashboard/userdashboard';
import NearShops from './components/user/usernearshops/index';
import ShopDetails from './components/user/shopdetails/shopdetails';
import UserProfile from './components/user/userprofile/userprofile';
import EditUserDetails from './components/user/edituserdetails/edituserdetails';
import MerchantSignUP from './components/merchant/merchantsignup';
import MerchantLogin from './components/merchant/merchantlogin';
import MerchantDashboard from './components/merchant/merchantdashboard';
import MerchantHome from './components/merchant/merchanthome';
import RequiredMerchantInfo from './components/merchant/requiredinfo';
import AddItem from './components/merchant/shop/additem';
import AddShop from './components/merchant/addshop';
import MerchantShops from './components/merchant/merchantshops';
import MerchantShopDetail from './components/merchant/shop/shopdetail';
import ShopDashboard from './components/merchant/shop/shopdashboard';
import ShopItems from './components/merchant/shop/shopitems';
import AddRecord from './components/merchant/shop/khatabook/addrecord';
import KhataDashboard from './components/merchant/shop/khatabook/khatadashboard';

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
  ShopDashboard: undefined;
  ShopItems: undefined;
  AddRecord: undefined;
  KhataDashboard: undefined;
};


export default function DukaanUI() {

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Greeting">
        <Stack.Screen name="Greeting" component={Greeting} />
        <Stack.Screen name="UserSignUp" component={UserSignUp} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="Dashboard" options={{headerShown: false}} component={MyTabs} />
        <Stack.Screen name="NearShops" options={{headerShown: false}} component={NearShops} />
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
        <Stack.Screen name="ShopDashboard" component={ShopDashboard} />
        <Stack.Screen name="ShopItems" component={ShopItems} />
        <Stack.Screen name="AddRecord" component={AddRecord} />
        <Stack.Screen name="KhataDashboard" component={KhataDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
