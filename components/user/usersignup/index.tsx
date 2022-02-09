import React from "react";
import { SafeAreaView, Text, Pressable, Image, Dimensions } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import styles from "../../../styles/common";
import signupstyle from "./styles";
import API from "../../../utils/api";
import ENDPOINTS from "../../../utils/endpoints";
import response from "../../../utils/data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import checkPassword, { passwordValidationErrorMessage, inputMode, activeOutlineColor, buttonTextColor, errorMsgColor, invalidUserNamePasswordErrorMessage, invalidUserNameErrorMessage, buttonWidth } from './utils';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


type Props = NativeStackScreenProps<RootStackParamList, "UserSignUp">;

const UserSignUp = ({ route, navigation }: Props) => {
  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [errorMsg, setErrorMsg] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const validateInput = () => {
    if (checkPassword(password) && validateUserName(username)) {
      return true;
    }
  };
  const userSignUP = async () => {
    if (!validateInput()) {
      console.log(
        "Don't send post request for signup, invalid username or password!",
        !validateInput
      );
      setErrorMsg(invalidUserNamePasswordErrorMessage);
      return;
    }
    await fetch(API + ENDPOINTS.REGISTER, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "allow-control-allow-origin": "*",
      },
      body: JSON.stringify({ username: username, password_hash: password }),
    })
      .then(async (data: any) => {
        console.log(data.status); // return 200, 403
        let x = await data.json();
        console.log(x?.[response.DATA]);
        setErrorMsg(x?.[response.DATA]);
        if (x[response.DATA] === response.SUCCESS) {
          navigation.navigate("UserLogin");
        }
        console.log("getting into then block", x);
      })
      .catch((e) => {
        console.log("getting an error", e);
      })
      .finally(() => {
        console.log("getting into finally block");
        setPassword("");
      });
  };


  function validateUserName(str: any) {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(str);
  }

  return (
    <SafeAreaView style={styles.container}>
      <MaterialCommunityIcons name="account-circle" size={80} color="purple" style={{marginBottom:20}}/>
      <TextInput
        autoComplete
        onBlur={() => {
          validateUserName(username) === false
            ? setErrorMsg(invalidUserNameErrorMessage)
            : setErrorMsg("");
        }}
        onChangeText={(username) => setUsername(username)}
        label="username"
        style={signupstyle.textInput}
        activeOutlineColor={activeOutlineColor}
        mode={inputMode}
        value={username}
      />
      <TextInput
      autoComplete={true}
        onBlur={() => {
          checkPassword(password) === false
            ? setErrorMsg(passwordValidationErrorMessage)
            : setErrorMsg("");
        }}
        onChangeText={setPassword}
        style={signupstyle.textInput}
        value={password}
        label="password"
        mode={inputMode}
        activeOutlineColor={activeOutlineColor}
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            name= {secureTextEntry ? "eye-off" : "eye"}
            onPress={() => {
              console.log(password);
              setSecureTextEntry(!secureTextEntry);
              return false;
            }}
          />
        }
      />
      <Text style={{ color: errorMsgColor }}>{errorMsg}</Text>
      <Button mode="contained" style={signupstyle.registerButton} onPress={() => userSignUP()}>
        <Text>Register</Text>
      </Button>
      <Text>Already a User?</Text>
      <Pressable
        style={{ bottom: 0 }}
        onPress={() => navigation.navigate("UserLogin")}
      >
        <Text style={{ color: buttonTextColor }}>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default UserSignUp;
