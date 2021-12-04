//Handling session and returning user here
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import API from "../utils/api";
import ENDPOINTS from '../utils/endpoints';

let user = "";


const Session = {
    functionCall: currentUser(),
    isLoggedIn: AsyncStorage.getItem("isLoggedIn"),
    userId: AsyncStorage.getItem("userid"),
    username: AsyncStorage.getItem("username"),
    currentUser: user
}

export default Session;