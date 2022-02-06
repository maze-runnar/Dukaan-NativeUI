import React from "react";
import { SafeAreaView, Text, Pressable } from "react-native";
import { TextInput, Button, Chip } from "react-native-paper";
import styles from "../../../styles/common";
import API from "../../../utils/api";
import ENDPOINTS from "../../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import checkPassword from "./utils";
import signupstyle from "../usersignup/styles";
import { activeOutlineColor, errorMsgColor, inputMode } from "../usersignup/utils";

type Props = NativeStackScreenProps<RootStackParamList, 'UserLogin'>;


const UserLogin = ({ route, navigation }: Props) => {
  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [errorMsg, setErrorMsg] = React.useState("");

  function validateUserName(str: any) {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(str);
  }

  const validateInput = () => {
    if (checkPassword(password) && validateUserName(username)) {
      return true;
    }
  };
  // const navigation = useNavigation();
  const userLogin = async () => {
    if (username === "sonu") { // admin testing
      navigation.navigate("Dashboard");
    }
    if (!validateInput()) {
      console.log(
        "Don't send post request for login, invalid username or password!",
        !validateInput
      );
      setErrorMsg("invalid username or password");
      return;
    }
    await fetch(API + ENDPOINTS.LOGIN, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "allow-control-allow-origin": "*",
      },
      body: JSON.stringify({ username: username, password_hash: password }),
    })
      .then(async (data: any) => {
        let x = await data.json();
        console.log(x?.["message"]);
        setErrorMsg(x?.["message"]);
        if (data.status === 200) {
          navigation.navigate("Dashboard");
          await AsyncStorage.setItem("username", username);
          await AsyncStorage.setItem("userid", String(x?.["id"]));
          await AsyncStorage.setItem("isLoggedIn", "true");
          console.log(await AsyncStorage.getItem("userid"), await AsyncStorage.getItem("username"), await AsyncStorage.getItem("password"));
        }
        console.log("getting into then block", x);
      })
      .finally(() => {
        console.log("getting into finally block");
        setPassword("");
      });
  };


  return (
    <SafeAreaView style={styles.container}>
      <Chip icon="account-arrow-right-outline" style={{paddingLeft: 50, paddingRight:50, paddingTop: 10, paddingBottom:10, marginBottom: 50}} onPress={() => console.log('Pressed')}>Welcome!</Chip>
      <TextInput
        onBlur={() => {
          validateUserName(username) === false
            ? setErrorMsg("not a valid username")
            : setErrorMsg("");
        }}
        label="username"
        style={signupstyle.textInput}
        activeOutlineColor={activeOutlineColor}
        mode={inputMode}
        value={username}
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput
        onBlur={() => {
          checkPassword(password) === false
            ? setErrorMsg("not a valid password")
            : setErrorMsg("");
        }}
        onChangeText={(password) => setPassword(password)}
        value={password}
        label="password"
        style={signupstyle.textInput}
        activeOutlineColor={activeOutlineColor}
        mode={inputMode}
        secureTextEntry
      />
      <Text style={{ color: errorMsgColor }}>
        {errorMsg}
      </Text>
      <Button mode="contained" style={signupstyle.registerButton} onPress={() => userLogin()}>
        <Text>Login</Text>
      </Button>
      <Text>Not a User?</Text>
      <Pressable
        style={{ bottom: 0 }}
        onPress={() => navigation.navigate("UserSignUp")}
      >
        <Text style={{ color: "purple" }}>SignUP</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default UserLogin;

