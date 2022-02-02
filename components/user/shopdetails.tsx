import React, { useEffect } from "react";
import { SafeAreaView, Text, Pressable, TextInput, ScrollView, View, Image, Dimensions, StyleSheet } from "react-native";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sleep from "../../utils/sleep";
import ShopItems from "../merchant/shop/shopitems";

const { width } = Dimensions.get("window");
const height = width * 0.6;   //60%

const imagess = [
	'https://media.istockphoto.com/photos/indian-shop-picture-id843318958?k=20&m=843318958&s=170667a&w=0&h=8HDHx4OMKg190BMdRudJ5Xn20Hgcl5kShFY2JYjwq7E=',
	'https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2hvcHxlbnwwfHwwfHw%3D&w=1000&q=80',
	'https://media.istockphoto.com/photos/indian-shop-picture-id843318958?k=20&m=843318958&s=170667a&w=0&h=8HDHx4OMKg190BMdRudJ5Xn20Hgcl5kShFY2JYjwq7E='
]

const ShopDetails = ({ route }: any) => {

	const [active, setActive] = React.useState(0);
	const [shop, setShop] = React.useState({});
	const [shopName, setShopName] = React.useState("");
	const [shopId, setShopId] = React.useState("");
	const [shopItem, setShopItem] = React.useState([]);


	useEffect(() => {
		const shop = async () => {
			const shopid: any = await AsyncStorage.getItem("currentShopId");
			setShopId(shopid);
			await fetch(API + ENDPOINTS.ITEM_LIST + shopid).then(async (res) => {
				const items = await res.json();
				// console.log("Shop Items : ", items);
				setShopItem(items['data']);
			});
		}
		shop();
		Sleep(1000);
		const shopDetails = async () => {
			const shopid: any = await AsyncStorage.getItem("currentShopId");
			setShopId(shopid);
			await fetch(API + ENDPOINTS.SHOP_DETAIL + shopid).then(async (res) => {
				const shopDetail = await res.json();
				// console.log("Shop Details : ", shopDetail);
				setShop(shopDetail['data']);
			});
		}

		shopDetails();
		Sleep(1000); // to wait for above promise to resolve,, kyuki wada to ttot jata hai
	}, [shopId]);

	const { itemId } = route.params;
	console.log("Item Id : ", shopItem);
	console.log("shop: ", shop)
	return (

		<ScrollView style={{ width, height }} >
			<ScrollView
				pagingEnabled horizontal showsHorizontalScrollIndicator={false}
				style={{ width, height }} >
				{
					imagess.map((item, index) => (
						<Image
							key={index}
							source={{ uri: item }}
							style={{ width, height, resizeMode: 'cover' }} />
					))
				}
			</ScrollView>
			<View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
				{imagess.map((i, k) => (
					<Text key={k} style={style.pagingdot} >⬤</Text>
				))}
			</View>
			<View>
			{
					shopItem.map((item, index) => (
						<Text>{item?.name}</Text>
					))
				}
			</View>
		</ScrollView>
	);
};

export default ShopDetails;
const style = StyleSheet.create({
	pagingdot: { color: 'purple', margin: 3 },
	pagingActivedot: { color: 'yellow', margin: 3 },
})

