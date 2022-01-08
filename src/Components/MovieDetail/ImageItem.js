import React from "react";
import FastImage from "react-native-fast-image";
import { View, StyleSheet } from "react-native";
import { getImageUrl } from "@/utils/utils";
import Colors from '@/Constants/Colors';

const ImageItem = ({ item = {} }) => {
    const posterURL = getImageUrl(item.file_path, 'uri', 'w300');
    return (
        <View style = {[ImageStyles.movieImageContainer, ImageStyles.movieImagePlaceholder, { width: 100 * item.aspect_ratio} ]}>
            <FastImage style={[ImageStyles.movieImageContainer, { width: 100 * item.aspect_ratio}]} source={posterURL} />
        </View>
    );
}

export default ImageItem;

const ImageStyles = StyleSheet.create({
    movieImageContainer: {
        height: 100,
        marginRight: 8,
        borderRadius: 8,
    },
    movieImagePlaceholder: {
        backgroundColor: Colors.gray,
    }
});