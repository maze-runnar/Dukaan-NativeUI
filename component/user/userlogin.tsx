import React from "react";
import { SafeAreaView, Text, Pressable, TextInput, AppRegistry } from "react-native";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
// import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import MyTabs from "./userdashboard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, 'UserLogin'>;


const UserLogin = ({ route, navigation }: Props) => {
  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [errorMsg, setErrorMsg] = React.useState("");

  const validateInput = () => {
    if (checkPassword(password) && validateUserName(username)) {
      return true;
    }
  };
  // const navigation = useNavigation();
  const userLogin = async () => {
    if(username === "sonu") { // admin testing
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
          await AsyncStorage.setItem("userid", x?.["id"]);
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

  function checkPassword(str: any) {
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    console.log(re.test(str));
    return re.test(str);
  }

  function validateUserName(str: any) {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(str);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onBlur={() => {
          validateUserName(username) === false
            ? setErrorMsg("not a valid username")
            : setErrorMsg("");
        }}
        style={styles.input}
        onChangeText={setUsername}
        placeholder="username"
        value={username}
      />
      <TextInput
        onBlur={() => {
          checkPassword(password) === false
            ? setErrorMsg("not a valid password")
            : setErrorMsg("");
        }}
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        placeholder="password"
        secureTextEntry
      />
      <Text>
        {errorMsg}
      </Text>
      <Pressable style={styles.ButtonStyle} onPress={() => userLogin()}>
        <Text style={{ color: "purple" }}> Login </Text>
      </Pressable>
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
