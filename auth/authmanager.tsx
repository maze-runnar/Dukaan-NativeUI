//Handling session and returning user here
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import API from "../utils/api";
import ENDPOINTS from '../utils/endpoints';

let user = "";

const currentUser = async()=> {
    const id = await  AsyncStorage.getItem("userid");
    if(id && id != "") {
        await fetch(API + ENDPOINTS.USER_DETAIL + id).then(async(res) => {
            user = await res.json();
            console.log("User: ", user);
        });
    }
    return user;
}

// currentUser();


export default currentUser;