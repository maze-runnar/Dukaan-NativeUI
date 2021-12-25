import React from "react";
import { SafeAreaView, Text, Pressable, TextInput,ScrollView,View,Image,Dimensions,StyleSheet } from "react-native";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
// import { useNavigation } from "@react-navigation/native";
import response from "../../utils/data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const {width} = Dimensions.get("window");
const height = width*0.6;   //60%

const imagess = [
	'https://media.istockphoto.com/photos/indian-shop-picture-id843318958?k=20&m=843318958&s=170667a&w=0&h=8HDHx4OMKg190BMdRudJ5Xn20Hgcl5kShFY2JYjwq7E=',
	'https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2hvcHxlbnwwfHwwfHw%3D&w=1000&q=80',
	'https://media.istockphoto.com/photos/indian-shop-picture-id843318958?k=20&m=843318958&s=170667a&w=0&h=8HDHx4OMKg190BMdRudJ5Xn20Hgcl5kShFY2JYjwq7E='
]


const ShopDetails = ({ route } : any) => {
	const state = {
		active : 0
	}
	const { itemId } = route.params;
	return (
		
			<ScrollView style={{width,height}} >
				<ScrollView 
				pagingEnabled horizontal showsHorizontalScrollIndicator ={false}
				style={{width,height}} > 
				{
					imagess.map((item,index)=>(
					<Image
					key={index}
					source={{uri:item}}
					style={{width, height, resizeMode: 'cover'}}/>
					))
				}
				</ScrollView>
				<View style={{flexDirection:'row', position:'absolute', bottom: 0, alignSelf:'center'}}>
					{imagess.map((i,k)=>(
					<Text key={k} style={style.pagingdot} >⬤</Text>
					))}
				</View>
				<View>
					
				</View>
			</ScrollView>
		);
};

export default ShopDetails;
const style = StyleSheet.create({
	pagingdot: {color:'purple', margin:3},
	pagingActivedot: {color:'yellow', margin:3},
})

