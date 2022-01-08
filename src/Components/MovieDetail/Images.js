import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ImageItem from './ImageItem';
import Colors from '@/Constants/Colors';
import Icon from 'react-native-vector-icons/Entypo';

const MovieImages = ({ movieImages = {} }) => {
    const { backdrops = [] } = movieImages;
    if (backdrops.length === 0) return null;
    return (
        <View>
            <Text style={MovieImageStyles.imagesTitle}><Icon name="images" size={18} />{' '}Images</Text>
            <FlatList
                keyExtractor={(item) => item.file_path}
                data={backdrops}
                renderItem={({ item }) => <ImageItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

export default MovieImages;

const MovieImageStyles = StyleSheet.create({
    imagesTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 18,
        marginBottom: 4,
        marginTop: 5,
        color: Colors.black
    }
});