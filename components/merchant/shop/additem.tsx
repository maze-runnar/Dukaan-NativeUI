import React, { useState } from "react";
import { View, Switch, TextInput, Text, Pressable, Button,Image } from 'react-native';
import styles from "../../../styles/signup";
import API from "../../../utils/api";
import ENDPOINTS from "../../../utils/endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';


const AddItem = () => {
    const [isAvailable, setisAvailable] = useState(true);
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [maxOrderAmount, setMaxOrderAmount] = useState("");
    const [minOrderAmount, setMinOrderAmount] = useState("");
    const [image, setImage] = useState(null);

    const toggleSwitch = () => setisAvailable(previousState => !previousState);

    const newItem = async () => {
        const shopId: any = await AsyncStorage.getItem("openedShopId");
        await fetch(API + ENDPOINTS.NEW_ITEM, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "allow-control-allow-origin": "*",
            },
            body: JSON.stringify({ name: itemName, is_available: isAvailable, shop_id: shopId, description: description, max_order_amount: maxOrderAmount, min_order_amount: minOrderAmount }),
        })
            .then(async (data: any) => {
                console.log(data.status); // return 200, 403
                let x = await data.json();
                console.log("getting into then block", x);
            })
            .catch((e) => {
                console.log("getting an error", e);
            })
            .finally(() => {
                setItemName("");
                setErrorMsg("Item Added successfully");
                console.log("getting into finally block");
            });
    };


    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            setImage(result.uri);
          }
      };
    
      const handleUploadPhoto = () => {
        fetch(`${API}/api/upload`, {
          method: 'POST',
        })
          .then((response) => response.json())
          .then((response) => {
            console.log('response', response);
          })
          .catch((error) => {
            console.log('error', error);
          });
        }


    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={setItemName}
                value={itemName}
                style={styles.input}
                placeholder="Item"
            />
            <TextInput
                onChangeText={setDescription}
                value={description}
                style={styles.input}
                multiline={true}
                numberOfLines={7}
                placeholder="Description"
            />
            <TextInput
                onChangeText={setMaxOrderAmount}
                value={maxOrderAmount}
                style={styles.input}
                placeholder="Max Order amount for item"
            />
            <TextInput
                onChangeText={setMinOrderAmount}
                value={minOrderAmount}
                style={styles.input}
                placeholder="Min Order amount for item"
            />
            
            <Text>Is Available: </Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isAvailable ? "purple" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isAvailable}
            />
            <Image source={{  uri: image }} />
            <Button title="Upload Photo" onPress={handleUploadPhoto} />
            <Button title="Choose Photo" onPress={handleChoosePhoto} />
            <Pressable style={styles.ButtonStyle} onPress={() => newItem()}>
                <Text style={{ color: "purple" }}> Add Item </Text>
            </Pressable>
             
            <Text style={{color: "green"}}>{errorMsg}</Text>

        </View>
    );
}

export default AddItem;