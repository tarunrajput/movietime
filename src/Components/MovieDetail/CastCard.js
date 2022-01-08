import React from "react";
import FastImage from "react-native-fast-image";
import { View, Text, StyleSheet } from "react-native";
import { getImageUrl } from "@/utils/utils";
import Colors from '@/Constants/Colors';

const CastCard = ({ item = {} }) => {
    const castThumbnailURL = getImageUrl(item.profile_path, 'uri', 'w185');
    return (
        <View>
            <View style={CastCardStyles.castImageContainer}>
                <FastImage style={CastCardStyles.castImage} source={castThumbnailURL} />
            </View>
            <Text style={CastCardStyles.castName}>{item.name}</Text>
        </View>
    );
}

export default CastCard;

const CastCardStyles = StyleSheet.create({
    castImageContainer: {
        overflow: "hidden",
        height: 125,
        width: 85,
        borderRadius: 8,
        marginRight: 8,
        backgroundColor: Colors.gray,
    },
    castImage: {
        width: 85,
        height: 150,
    },
    castName: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        width: 85,
        padding: 2,
        textAlign: 'center',
        marginTop: 2,
        color: Colors.black
    }
});