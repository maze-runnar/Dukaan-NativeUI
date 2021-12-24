import React, { useEffect } from "react";
import { SafeAreaView, Text, Pressable, TextInput, AppRegistry } from "react-native";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
// import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import MyTabs from "./userdashboard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, 'MerchantLogin'>;


const RequiredMerchantInfo = () => {
	let [location, setLocation] = React.useState("");
	let [mobile, setMobile] = React.useState("");
	let [pincode, setPincode] = React.useState("");

	const update = async () => {
		console.log(mobile, location);
		const id: any = await AsyncStorage.getItem("userid");
		await fetch(API + ENDPOINTS.MERCHANT_PROFILE_UPDATE + id, {
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
				// console.log(x?.[response.DATA]);
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

export default RequiredMerchantInfo;
