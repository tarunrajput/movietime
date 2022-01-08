import React from "react";
import Star from './Star';
import { View, Text, StyleSheet } from "react-native";
import Colors from '@/Constants/Colors';

const MovieRatingNRuntime = ({ rating, runtime, style = {}, textColor = Colors.white, starColor = Colors.gold, emptyStarColor = Colors.white }) => {
    return (
        <View style={{ flexDirection: 'row', ...style }}>
            {rating != 0 &&
                <View style={{ flexDirection: 'row'}}>
                    <Star color={emptyStarColor} />
                    <Star color={starColor} rating={rating} />
                    <Text style={[{...Styles.textRating},{ color: textColor }]}>{(rating / 2).toFixed(1)}</Text>
                    {runtime && <Text style={[{...Styles.runtime},{ color: textColor }]}>{`  |  ${runtime} mins`}</Text> }
                </View>
            }
        </View>
    );
}

export default MovieRatingNRuntime;
const Styles = StyleSheet.create({
    textRating: {
        fontFamily: 'Montserrat-Medium',
        marginLeft: 80
    },
    runtime: {
        fontFamily: 'Montserrat-Medium',
    }
});