import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import currentUser from "../../../auth/authmanager";
import styles from "../../../styles/common";
import API from "../../../utils/api";
import ENDPOINTS from "../../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Searchbar } from 'react-native-paper';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { IconButton } from 'react-native-paper';
import categories from "../../../utils/categories";
import CardView from "../../public/cardview";
import CategoryView from "./categoryview";

type Props = NativeStackScreenProps<RootStackParamList, "NearShops">;


const NearShops = ({ navigation }: Props) => {
    const [username, setUsername] = useState("");
    const [userid, setUserId] = useState("");
    const [pincode, setPincode] = useState("");
    const [currentPincode, setCurrentPincode] = useState(""); //let's say we need opening_time info here
    const [openingTime, setOpeningTime] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [nearbyShops, setnearbyShops] = useState([]);
    const [items, setitems] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [selectedCategoryItems, setSelectedCategoryItems] = React.useState([]);

    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);

    function sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms)); // sleep function to later use loading screen
    }

    useEffect(() => { // lifecycle in funcional component 
        const userValues = async () => {
            let x: any = await currentUser();
            const id: any = await AsyncStorage.getItem("userid");
            fetch(API + ENDPOINTS.NEAR_BY_SHOPS + id).then(async (res) => {
                const nearshops = await res.json();
                setnearbyShops(nearshops['data']);
                console.log("Shops: ", nearbyShops);
            });
            setCurrentPincode(x?.['data']['pincode']);
            await sleep(1000);
            setUsername(x?.['data']['username']);
            setOpeningTime(x?.['data']['opening_time']); // now where data came from, opening_time is key of that dictionary 
            setUserId(id);
            console.log(username, "current user data for sesion");
        };
        userValues();
        {
            nearbyShops.map((x) => {
                const shop = async () => {
                    await fetch(API + ENDPOINTS.ITEM_LIST + x['id']).then(async (res) => {
                        const getitems: any = await res.json();
                        // setitems(...items['data']);
                        let updateditemarray = items;
                        updateditemarray.push(getitems['data']);
                        setitems(updateditemarray);
                        console.log("Shop Id : ", items);
                    });
                };
                shop();
                sleep(1000);

            })
        }
        // const fetchNearShops = async () => { 
        //     const id: any = await AsyncStorage.getItem("userid");

        // };
        // fetchNearShops();
    }, [userid, currentPincode]);
    const savePincode = () => {
        console.log(pincode, userid);
        fetch(API + ENDPOINTS.USER_DETAIL + userid, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "allow-control-allow-origin": "*",
            },
            body: JSON.stringify({ pincode: pincode }),
        }).then((res) => {
            if (res.status === 200) {
                setErrorMsg("pincode updated successfully."); //this is to set the error/success msg that any event is completed
            }
        })
    }

    const searchItem = async () => {
        const id: any = await AsyncStorage.getItem("userid");

        // if(searchQuery.trim() === "") {
        //     await fetch(API + ENDPOINTS.ITEM_LIST + id).then(async (res) => {
        //         const getitems: any = await res.json();
        //         // setitems(...items['data']);
        //         let updateditemarray = items;
        //         updateditemarray.push(getitems['data']);
        //         setitems(updateditemarray);
        //         console.log("Shop Id : ", items);
        //     });
        // } else {
        fetch(API + ENDPOINTS.ITEM_FILTER_BY_NAME + searchQuery).then(async (res) => {
            const getitems: any = await res.json();
            let updateditemarray: any = [];
            updateditemarray.push(getitems['data']);
            setitems(updateditemarray);

            // setitems(getitems['data']);
            console.log(getitems['data']);
            sleep(1000);
        });
        // }
        fetch(API + ENDPOINTS.NEAR_BY_SHOPS + id + "?itemname=" + searchQuery).then(async (res) => {
            const nearshops = await res.json();
            setnearbyShops(nearshops['data']);
            // console.log("Shops: ", nearbyShops);
        });

        // console.log(searchQuery);
    }

    function filterByCategory(category: string | any) {
        setSelectedCategory(category);
        fetch(API + ENDPOINTS.ITEM_FILTER_BY_CATEGORY + category).then(async (res) => {
            const nearshops = await res.json();
            console.log(nearshops);
            setSelectedCategoryItems(nearbyShops['data']);
        });
    }

    return (
        <ScrollView style={{ backgroundColor: "white" }} >
            <Searchbar
                onIconPress={searchItem}
                onChangeText={onChangeSearch}
                value={searchQuery}
                placeholder="search item and shops.."
                style={{ marginBottom: 1, marginTop: 5, elevation: 0, borderColor: "white" }}
            />

            {/* top horizontal filter by category scroll */}
            <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 3 }}>
                {categories.map((category, index) => {
                    return (
                        <View style={styles.cardcenters} key={index}>
                            <IconButton
                                icon={category.icon}
                                size={20}
                                onPress={() => filterByCategory(category.name)}
                            />
                            <Text> {category.name} </Text>
                        </View>
                    )
                })}
            </ScrollView>

            {/* Near by shops cards */}
            <ScrollView >
                {nearbyShops.map((x: any, index) => {
                    return (
                        <CardView currentShop={x} key={index} />
                    )
                })}
            </ScrollView>

            {/* <Text style={{ textAlign: "center", margin: 5 }}>Items</Text> */}

            <Text style={{ margin: 5 }}>Grocery</Text>
            <CategoryView items={items} itemCategory='Grocery' imageUri='https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/567640979/shopping-cart-grocery-store.jpg' />

            <Text style={{ margin: 5 }}>Stationery</Text>
            <CategoryView items={items} itemCategory='Stationery' imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHZvccZEryobKtUSLVx2Uui7YmsbZ5l_5g6w&usqp=CAU" />

            <Text style={{ margin: 5 }}>Fashion</Text>
            <CategoryView items={items} itemCategory='Fashion' imageUri='https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2019/07/31121724/fashion-1024x682.jpeg' />

            <Text style={{ margin: 5 }}>Electronics</Text>
            <CategoryView items={items} itemCategory='Electronics' imageUri='https://img.archiexpo.com/images_ae/photo-g/125975-15350210.jpg' />

            <Text style={{ margin: 5 }}>Medical</Text>
            <CategoryView items={items} itemCategory='Medical' imageUri='https://img.archiexpo.com/images_ae/photo-g/125975-15350210.jpg' />

            <Text style={{ margin: 5 }}>Beauty</Text>
            <CategoryView items={items} itemCategory='Beauty' imageUri='https://img.archiexpo.com/images_ae/photo-g/125975-15350210.jpg' />

        </ScrollView>
    );
};

export default NearShops;
