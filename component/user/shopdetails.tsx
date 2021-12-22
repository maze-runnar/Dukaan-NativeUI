import React from "react";
import { SafeAreaView, Text, Pressable, TextInput } from "react-native";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
// import { useNavigation } from "@react-navigation/native";
import response from "../../utils/data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";


const ShopDetails = ({ route } : any) => {
	const { itemId } = route.params;
	return (
		<SafeAreaView style={styles.container}>
			{itemId}
		</SafeAreaView>	
		);
};

export default ShopDetails;