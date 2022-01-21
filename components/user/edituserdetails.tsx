import React, { useEffect } from "react";
import { SafeAreaView, Text, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
// import { useNavigation } from "@react-navigation/native";
import response from "../../utils/data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import AsyncStorage from '@react-native-async-storage/async-storage';
import currentUser from "../../auth/authmanager";
import { useNavigation } from "@react-navigation/native";


const EditUserDetails = ({ route }: any) => {
	const { userId } = route.params;
	let [username, setUsername] = React.useState("");
	let [fullname, setName] = React.useState("");
	let [location, setLocation] = React.useState("");
	let [mobile, setMobile] = React.useState("");
	let [pincode, setPincode] = React.useState("");
	let [errorMsg, setErrorMsg] = React.useState("");

	function sleep(ms: any) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const nav = useNavigation();

	useEffect(() => {
		const userValues = async () => {
			let x: any = await currentUser();
			const id: any = await AsyncStorage.getItem("userid");
			sleep(1000);
			setUsername(x?.['data']?.['username']);
			setPincode(x?.['data']['pincode']);
			setMobile(x?.['data']['mobile']);
			setLocation(x?.['data']['location']);
			setName(x?.['data']['name']);
		};
		userValues();
	}, [username, nav]);



	const update = async () => {
		console.log(mobile, location);
		const id: any = await AsyncStorage.getItem("userid");
		if (mobile.length != 10) {
			setErrorMsg("Invalid Mobile number");
			return;
		}
		await fetch(API + '/api/v1/user/' + id, {
			method: "PUT",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
				"allow-control-allow-origin": "*",
			},
			body: JSON.stringify({ mobile: mobile, location: location, pincode: pincode, name:fullname }),
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
		setErrorMsg("");
		nav.navigate("UserProfile");
	};


	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={{ width: '90%', marginBottom: 5 }}
				onChangeText={setName}
				label="name"
				value={fullname}
			/>
			<TextInput
				style={{ width: '90%', marginBottom: 5 }}
				onChangeText={setLocation}
				label="location"
				value={location}
			/>
			<TextInput
				style={{ width: '90%', marginBottom: 5 }}
				onChangeText={setPincode}
				label="pincode"
				value={pincode}
			/>
			<TextInput
				onChangeText={setMobile}
				value={mobile}
				style={{ width: '90%', marginBottom: 5 }}
				label="Mobile no."
			/>
			<Pressable style={styles.ButtonStyle} onPress={() => update()}>
				<Text style={{ color: "purple" }}> Update </Text>
			</Pressable>
			<Text style={{ color: 'red' }}>{errorMsg}</Text>
		</SafeAreaView>
	);
};

export default EditUserDetails;

