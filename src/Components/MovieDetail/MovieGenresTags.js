import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native";
import Colors from '@/Constants/Colors';

const MovieGenresTags = ({ genres = [] }) => {
    return (
        <View style={genresStyles.genresContainer}>
            {genres.map((item, index) => {
                return <View key={index} style={genresStyles.block}>
                    <Text style={genresStyles.genreLabel}>{item.name}</Text>
                </View>
            })}
        </View>
    )
};

export default MovieGenresTags;

const genresStyles = StyleSheet.create({
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
    },
    block: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 0.75,
        borderColor: Colors.secondary,
        borderRadius: 4,
        marginRight: 4,
        marginBottom: 4,
    },
    genreLabel: {
        color: Colors.secondary,
        fontFamily: "Montserrat-Light",
        fontSize: 12,
    }
});