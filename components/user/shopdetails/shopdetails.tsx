import React, { useEffect } from "react";
import { SafeAreaView, Text, Pressable, TextInput, ScrollView, View, Image, Dimensions, StyleSheet, Button, Alert, TouchableOpacity} from "react-native";
import { Avatar, Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../../../styles/common";
import API from "../../../utils/api";
import ENDPOINTS from "../../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sleep from "../../../utils/sleep";
import ShopItems from "../../merchant/shop/shopitems";
import Topbar from "../../public/topbar";

const { width } = Dimensions.get("window");
const height = width * 0.6;   //60%
const RightContentClosed = (props: any) => <View style={{ paddingLeft: 4, paddingRight: 4, borderRadius: 5, marginRight: 3 ,}}>
												<Button
													title= "Add +"
													color="green"
													onPress={() => Alert.alert('Button with adjusted color pressed')}
													
												/>
											
											</View>

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
				console.log("Shop Details : ", shopDetail);
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
		<ScrollView style={{ width, height, backgroundColor:'white' }} >
			<Topbar name = {shop?.name} address = {shop?.location}/>

			<ScrollView
				pagingEnabled horizontal showsHorizontalScrollIndicator={false}
				style={{ width, height }} >
				{
					imagess.map((item, index) => (
						<Image
							key={index}
							source={{ uri: item }}
							style={{ width, height, resizeMode: 'cover', borderRadius: 10, marginRight: 2 }} />
					))
				}
			</ScrollView>
			<View style={{marginTop:10 , marginLeft: 7, marginRight: 7}}> 
			{
					shopItem.map((item, index) => (
						<view>
							<Card style={{
								margin: 5, borderRadius: 10, shadowColor: '#e8e9ed',
								width: "95%",
								shadowOffset: { width: 0, height: 5 },
								shadowOpacity: 0.6,
								elevation: 5
							}}>
								<Card.Title title={item?.name} subtitle={" 50Rs/Kg" +"  " +"🥬 \n" + "⭐ Bestseller"}

								// left={LeftContent} right={RightContentClosed} 
								right={RightContentClosed}
								/>
							</Card>
						{/* <Text>{item?.name}</Text>
						<View style={{ borderBottomColor: '#d7d9d7', borderBottomWidth: 1, margin: 10}}/> */}
						</view>

					))
				}
			</View>
			
		</ScrollView>
	);
};

export default ShopDetails;

