import React, { useEffect } from "react";
import { SafeAreaView, Text, Pressable, TextInput } from "react-native";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
// import { useNavigation } from "@react-navigation/native";
import response from "../../utils/data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import AsyncStorage from '@react-native-async-storage/async-storage';
import currentUser from "../../auth/authmanager";


const EditUserDetails = ({ route } : any) => {
	const { userId } = route.params;
	let [username, setUsername] = React.useState("");
	let [location, setLocation] = React.useState("");
	let [mobile, setMobile] = React.useState("");
	let [pincode, setPincode] = React.useState("");
	let [errorMsg, setErrorMsg] = React.useState("");

	function sleep(ms:any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const userValues = async () => {
            let x: any = await currentUser();
            const id: any = await AsyncStorage.getItem("userid");
            sleep(1000);
            setUsername(x?.['data']?.['username']);
            setPincode(x?.['data']['pincode']);
            setMobile(x?.['data']['mobile']);
            setLocation(x?.['data']['location']);
        };
        userValues();  
    }, [username]);
    


	const update = async () => {
		console.log(mobile, location);
		const id: any = await AsyncStorage.getItem("userid");
		await fetch(API + '/api/v1/user/' + id, {
		  method: "PUT",
		  cache: "no-cache",
		  headers: {
			"Content-Type": "application/json",
			"allow-control-allow-origin": "*",
		  },
		  body: JSON.stringify({ mobile: mobile, location: location, pincode: pincode }),
		})
		  .then(async (data: any) => {
			console.log(data.status); // return 200, 403
			let x = await data.json();
			console.log(x?.[response.DATA]);
			// setErrorMsg(x?.[response.DATA]);
			// if (x[response.DATA] === response.SUCCESS) {
			//   navigation.navigate("UserLogin");
			// }
			console.log("getting into then block", x);
		  })
		  .catch((e) => {
			console.log("getting an error", e);
		  })
		  .finally(() => {
			console.log("getting into finally block");
		  });
	  };
	

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.input}
				onChangeText={setLocation}
				placeholder="location"
				value={location}
			/>
			<TextInput
				style={styles.input}
				onChangeText={setPincode}
				placeholder="pincode"
				value={pincode}
			/>
			<TextInput
				onChangeText={setMobile}
				value={mobile}
				style={styles.input}
				placeholder="Mobile no."
			/>
			<Pressable style={styles.ButtonStyle} onPress={() => update()}>
				<Text style={{ color: "purple" }}> Update </Text>
			</Pressable>
      
		</SafeAreaView>	
		);
};

export default EditUserDetails;

