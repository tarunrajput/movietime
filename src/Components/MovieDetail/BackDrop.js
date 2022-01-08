import React from "react";
import FastImage from "react-native-fast-image";
import { View, StyleSheet, Dimensions } from "react-native";
import { getImageUrl } from "@/utils/utils";
import Colors from "@/Constants/Colors"
import LinearGradient from "react-native-linear-gradient";

const BackDrop = ({ backDropPath, children }) => {
    const backDropImageSrc = getImageUrl(backDropPath, 'uri', 'original');
    return (
        <View style={BackDropStyles.container}>
            <FastImage source={backDropImageSrc} resizeMode={"cover"} style={BackDropStyles.imageStyle} />
            <LinearGradient colors={['transparent', Colors.black]} locations={[0.45, 0.9]} style={BackDropStyles.linearGradientImg} />
            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, margin: 16, borderTopLeftRadius: 16 }}>
                {children}
            </View>
        </View>
    );
}

export default BackDrop;

const BackDropStyles = StyleSheet.create({
    imageStyle: {
        flex: 1,
        height: Dimensions.get("window").width * 1.7777,
        width: Dimensions.get("window").width,
    },
    container: {
        height: Dimensions.get("window").height / 2.5,
        backgroundColor: Colors.black,
    },
    linearGradientImg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    }
})
