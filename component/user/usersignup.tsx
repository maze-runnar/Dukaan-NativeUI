import React from 'react';
import {SafeAreaView, Text, Pressable, TextInput} from 'react-native';
import styles  from '../../styles/signup';
import API from '../../api';
import  ENDPOINTS  from '../../endpoints';


const UserSignUp = (props: any) => {
    let [username, onChangeText] = React.useState("");
    let [password, onChangeNumber] = React.useState("");
    let [errorMsg, setErrorMsg]= React.useState("");

    const validateInput = () => {
      if(checkPassword(password)) {
        return true;
      }
    }

    const userSignUP = async() => {
        if(!validateInput()) {
          console.log("returning from here", !validateInput);
          return;
        }
        await fetch(API + ENDPOINTS.REGISTER, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'allow-control-allow-origin': '*'
        },
        body: JSON.stringify({"username":username, "password_hash":password})
      })
      .then(async(data:any) => {
        let x = await data.json();
        console.log(x?.['message']);
        console.log("getting into then block", x);
      }).finally(() => {
        console.log("getting into finally block");
        username = "";
        
      })
    }
    function checkPassword(str:any)
    {
        let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        console.log(re.test(str));
        return re.test(str);
    }

    return (
      <SafeAreaView style={styles.container}>
        <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="username"
        value={username}
      />
      <TextInput
        onBlur = {() => {checkPassword(password) === true? "not a valid password": "Valid";}}
        onChangeText={onChangeNumber}
        value={password}
        style={styles.input}
        placeholder="password"
        secureTextEntry
      />
      <Pressable style={styles.ButtonStyle} onPress={() => userSignUP()}> 
          <Text style={{color: "purple"}}> Signup </Text>
        </Pressable>
      </SafeAreaView>
      
    );
  }
  
export default UserSignUp;

