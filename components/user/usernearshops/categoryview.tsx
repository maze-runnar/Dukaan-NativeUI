import React from "react";
import { ScrollView, View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../../styles/common";

const CategoryView = (props: any) => {

    return (
        <ScrollView pagingEnabled horizontal={true} showsHorizontalScrollIndicator={false}>
            {props.items.map((x: any) => {
                return (x?.map((y: any) => {
                    if (y['category'] == props.itemCategory && y['is_available'] == true)
                        return (
                            <View style={styles.cardcenters}>
                                <Image
                                    source={{ uri: props.ImageUri }}
                                    style={{ width: 100, height: 100, resizeMode: 'cover' }} />
                                <Text  > {y['name'] + "\n"} </Text>
                            </View>
                        )
                })
                )
            })}
        </ScrollView>
    );
};

export default CategoryView;