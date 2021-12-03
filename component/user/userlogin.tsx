import React from "react";
import { SafeAreaView, Text, Pressable, TextInput } from "react-native";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
import { useNavigation } from "@react-navigation/native";

const UserLogin = (props: any) => {
  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [errorMsg, setErrorMsg] = React.useState("");

  const validateInput = () => {
    if (checkPassword(password) && validateUserName(username)) {
      return true;
    }
  };
  const navigation = useNavigation();
  const userLogin = async () => {
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
      <small style={{ color: "red" }}>{errorMsg}</small>
      <Pressable style={styles.ButtonStyle} onPress={() => userLogin()}>
        <Text style={{ color: "purple" }}> Login </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default UserLogin;
