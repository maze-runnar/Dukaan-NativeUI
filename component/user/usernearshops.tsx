import React, { useEffect, useState } from "react";
import { View, Button, Text,Dimensions ,TextInput, Pressable, SafeAreaView, ScrollView, ImageBackground, SliderComponent, Image } from "react-native";
import currentUser from "../../auth/authmanager";
import styles from "../../styles/signup";
import API from "../../utils/api";
import ENDPOINTS from "../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



const LeftContent = (props: any) => <Avatar.Icon {...props} icon="shopping-outline" color="orange" style={{ backgroundColor: 'purple' }} />
const RightContentOpen = (props: any) => <div style={{ backgroundColor: "#9be864", paddingLeft: '4px', paddingRight: '4px', borderRadius: '5px', marginRight: '3px' }}><Text>Open</Text></div>
const RightContentClosed = (props: any) => <div style={{ backgroundColor: "#ff0000", paddingLeft: '4px', paddingRight: '4px', borderRadius: '5px', marginRight: '3px' }}><Text style={{ color: "white" }}>Closed</Text></div>

type Props = NativeStackScreenProps<RootStackParamList, "NearShops">;


const NearShops = ({ navigation }: Props) => {
    const [username, setUsername] = useState("");
    const [userid, setUserId] = useState("");
    const [pincode, setPincode] = useState("");
    const [currentPincode, setCurrentPincode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [nearbyShops, setnearbyShops] = useState([]);
    const [items,setitems] = useState([]);


    function sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
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
            setUserId(id);
            console.log(username, "current user data for sesion");
        };
        userValues();
        {nearbyShops.map((x) => {
            const shop = async () => {
                await fetch(API + ENDPOINTS.ITEM_LIST + x['id']).then(async (res) => {
                    const getitems:any = await res.json();
                    // setitems(...items['data']);
                    let updateditemarray = items;
                    updateditemarray.push(getitems['data']);
                    setitems(updateditemarray);
                    console.log("Shop Id : ", items);
                });
            };
            shop();
            sleep(1000);

        })}
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
                setErrorMsg("pincode updated successfully.")
            }
        })
    }
    return (
        <ScrollView style={{backgroundColor:"white"}} >
                <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator ={false}
                style={{marginBottom:3}}>

                <View style={styles.cardcenters}>
                    <MaterialCommunityIcons name="dresser" size={26} />
                        <Text> All </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="food" size={26} />
                    <Text> Grocery </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="bag-checked" size={26} />
                    <Text> Fashion </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="electric-switch" size={26} />
                    <Text> Electronics </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="medical-bag" size={26} />
                    <Text> Medical </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="book" size={26} />
                    <Text> Stationery </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="star-face" size={26} />
                    <Text> Beauty </Text>
                </View>
                <View style={styles.cardcenters} >
                    <MaterialCommunityIcons name="pinwheel" size={26} />
                    <Text> Toy </Text>
                </View>

                </ScrollView>
                <ScrollView >
                    {nearbyShops.map((x) => {
                        return (
                            <Pressable onPress={() => {
                                navigation.navigate('ShopDetails', { itemId: x['id'] });
                            }}>
                            <Card style={{margin: "5px", borderRadius:"10px", shadowColor: '#ffff00',
                            shadowOffset: {width: 0, height: 5},
                            shadowOpacity: 0.4,
                            elevation: 1}}>
                                <Card.Title title={x['name']} subtitle={"📍: "+x['location']+ "\n" 
                                +"☎️: " + x['mobile']+"\n"+
                                "Time: " + x['opening_time'] + " - " + x['close_time'] 
                            } 
                                
                                left={LeftContent} right={RightContentClosed}/>
                            </Card>
                            </Pressable>
                        )
                    })}
                </ScrollView>
                <View style={{backgroundColor:'gray',height:2,marginTop:5}}></View>
                <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator ={false}>
                                    
                                    <View style={styles.cardcenters}>
                                        <Image
                                            source={{uri:'https://png.pngtree.com/png-clipart/20210613/original/pngtree-buy-1-get-free-offer-tag-symbols-design-png-image_6402685.jpg'}}
                                            style={{width:200,height:200, resizeMode: 'cover'}}/>
                                    </View>
                                    <View style={styles.cardcenters}>
                                        <Image
                                            source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLrw6E-kgA4_uHfhuEj64WfxZOV19HAl799A&usqp=CAU'}}
                                            style={{width:200,height:200, resizeMode: 'cover'}}/>
                                    </View>
                                    <View style={styles.cardcenters}>
                                        <Image
                                            source={{uri:'https://upcycleluxe.com/wp-content/uploads/2021/09/fashion-1-1-min.jpg'}}
                                            style={{width:200,height:200, resizeMode: 'cover'}}/>
                                    </View>
                    </ScrollView>
                <View style={{backgroundColor:'gray',height:2}}></View>
                <Text style={{textAlign:"center",margin:5,fontWeight:1000}}>Items</Text>
                <Text style={{margin:5,fontWeight:700}}>Grocery</Text>
                <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator ={false}>
                {items.map((x) => {
                        return (x?.map((y) =>{ 
                            if(y['description']=='Grocery' && y['is_available']==true)                           
                                return (
                                    
                                    <View style={styles.cardcenters}>
                                        <Image
                                            source={{uri:'https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/567640979/shopping-cart-grocery-store.jpg'}}
                                            style={{width:100,height:100, resizeMode: 'cover'}}/>
                                            <Text  > {y['name']+"\n"} </Text>
                                    </View>
                                    
                                    
                                )
                        })
                        )  
                    })}
                    </ScrollView>
                    <Text style={{margin:5,fontWeight:700}}>Stationery</Text>
                    <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator ={false}
                    style={{margin:5}}>
                {items.map((x) => {
                        return (x?.map((y) =>{ 
                            if(y['description']=='Stationery' && y['is_available']==true)                           
                                return (
                                    
                                    <View style={styles.cardcenters}>
                                        <Image
                                            source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHZvccZEryobKtUSLVx2Uui7YmsbZ5l_5g6w&usqp=CAU'}}
                                            style={{width:100,height:100, resizeMode: 'cover'}}/>
                                            <Text > {y['name']+"\n"} </Text>
                                    </View>
                                    
                                    
                                )
                        })
                        )  
                    })}
                    </ScrollView>
                    <Text style={{margin:5,fontWeight:700}}>Fashion</Text>
                    <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator ={false}
                    style={{margin:5}}>
                {items.map((x) => {
                        return (x?.map((y) =>{ 
                            if(y['description']=='Fashion' && y['is_available']==true)                           
                                return (
                                    
                                    <View style={styles.cardcenters}>
                                        <Image
                                            source={{uri:'https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2019/07/31121724/fashion-1024x682.jpeg'}}
                                            style={{width:100,height:100, resizeMode: 'cover'}}/>
                                            <Text > {y['name']+"\n"} </Text>
                                    </View>
                                    
                                    
                                )
                        })
                        )  
                    })}
                    </ScrollView>
                    <Text style={{margin:5,fontWeight:700}}>Electronics</Text>
                    <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator ={false}
                    style={{margin:5}}>
                {items.map((x) => {
                        return (x?.map((y) =>{ 
                            if(y['description']=='Electronics' && y['is_available']==true)                           
                                return (
                                    
                                    <View style={styles.cardcenters}>
                                        <Image
                                            source={{uri:'https://img.archiexpo.com/images_ae/photo-g/125975-15350210.jpg'}}
                                            style={{width:100,height:100, resizeMode: 'cover'}}/>
                                            <Text > {y['name']+"\n"} </Text>
                                    </View>
                                    
                                    
                                )
                        })
                        )  
                    })}
                    </ScrollView>
                    <Text style={{margin:5,fontWeight:700}}>Medical</Text>
                    <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator ={false}
                    style={{margin:5}}>
                {items.map((x) => {
                        return (x?.map((y) =>{ 
                            if(y['description']=='Medical' && y['is_available']==true)                           
                                return (
                                    
                                    <View style={styles.cardcenters}>
                                        <Image
                                            source={{uri:'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5dbb4182d85e3000078fddae%2F0x0.jpg'}}
                                            style={{width:100,height:100, resizeMode: 'cover'}}/>
                                            <Text > {y['name']+"\n"} </Text>
                                    </View>
                                    
                                    
                                )
                        })
                        )  
                    })}
                    </ScrollView>
                    <Text style={{margin:5,fontWeight:700}}>Toy Store</Text>
                    <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator ={false}
                    style={{margin:5}}>
                {items.map((x) => {
                        return (x?.map((y) =>{ 
                            if(y['description']=='Toy' && y['is_available']==true)                           
                                return (
                                    
                                    <View style={styles.cardcenters}>
                                        <Image
                                            source={{uri:'https://images.squarespace-cdn.com/content/v1/5c6dae6277b903c476e30e87/1550755850498-Q31MGBH664MMO0FO5VIZ/The-Red-Balloon-Toy-Shop-Orleans-Legos-Cape-Cod.jpg?format=1000w'}}
                                            style={{width:100,height:100, resizeMode: 'cover'}}/>
                                            <Text > {y['name']+"\n"} </Text>
                                    </View>
                                    
                                    
                                )
                        })
                        )  
                    })}
                    </ScrollView>
                    <Text style={{margin:5,fontWeight:700}}>Beauty</Text>
                    <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator ={false}
                    style={{margin:5}}>
                {items.map((x) => {
                        return (x?.map((y) =>{ 
                            if(y['description']=='Beauty' && y['is_available']==true)                           
                                return (
                                    
                                    <View style={styles.cardcenters}>
                                        <Image
                                            source={{uri:'data:image/jpeg;base64,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a0c1XU1OOTsMfxAEdMxw7zIG2s4/ayt9bE8CF0dun6Hn+3F/jNQEvtE7c4YQzS0UbBbk05WG3sVWI2tjwKtlYbPdFLmI0IszIB/d/er6+ibPSiJ4u18bQevhGo81QpdgqnM6MGN8Lrg3da7XaHukaOtzHzV0LODi3Y6mGlSqYSdCU1GV82uz0tYhdndqsRhoYIaelpsjYWBkjpSNMou8gtA4kkngDzXLh+GYrWudJuIX69575XNDjf6LsvG2vlp6L7bD0rKWc4ViMroZIjeAXyRVLT4SJNMxHC2h5ciBs1LAyNoYxoa0DQAWAHkvFJRXlbuVxxMcPD8htSa17dtrv20XIzPajBMWraF2H/B0cTDkyls7iWZHhwsCzibEftFaXQNcI2B/jDGh3PvBoza+t1EVm1tLFVw0GfPUSkjJGM5jAaXZpbeAaW978LkWBVHPCIiAIiIAiIgCIiAIiIAiIgCq+0GwWHVzt5NTt3t77yMmKQkcCXMIzH1urQiAoX9VtNwNViBZ9Q1Tsvpwv96nNmtjqLDr/DQNY46F5u+Rw6F7iTbyGisKIAq1tPsXSYi5skzHNmYLMmicY5WjUgBw4i5Jsb2ueqsqICpYJsDS0szaovqJ52AhklRM6UszCxyjQDTTgrW5oIseC/SICk13Zhhz3mWJstLI7iaaV0N/2Rdo9gvcO7MsPikE0jZKmRvB1TI6a37J7p9wrqiA8AsovaTAYcQgdSzhxicWkhpym7XBw19QpVEB84Yw1oaOAAA9ALBfREQETj+z1LXR7qphbK3lfRzSebXCzmn0Kq7eymjb3WVFcyPhu21LhHbpa17e6vyICA2b2So8OBFNC1hd4nm7pHc+891zby4KfREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREB/9k='}}
                                            style={{width:100,height:100, resizeMode: 'cover'}}/>
                                            <Text > {y['name']+"\n"} </Text>
                                    </View>
                                    
                                    
                                )
                        })
                        )  
                    })}
                    </ScrollView>
        </ScrollView>
    );
};

export default NearShops;
