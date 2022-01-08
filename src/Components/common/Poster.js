import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";
import { getImageUrl } from "@/utils/utils";
import Colors from '@/Constants/Colors';

const Poster = ({ item, navigation, height, width, type }) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (type === "tv") {
                    navigation.navigate("TVDetail", { id: item.id });
                } else {
                    navigation.navigate("MovieDetail", { id: item.id });
                }
            }}
        >
            <View style={styles.imageContainer}>
                <FastImage style={{ height: 180, width: 120 }} resizeMode="cover" source={getImageUrl(item.poster_path)} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Poster;

const styles = StyleSheet.create({
    imageContainer: {
        margin: 4,
        backgroundColor: Colors.gray,
        borderRadius: 8,
        overflow: "hidden",
    },
});
