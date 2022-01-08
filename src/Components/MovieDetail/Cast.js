import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CastCard from "./CastCard";
import Colors from '@/Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MovieCast = ({ castDetail = {} }) => {
    const { cast = [] } = castDetail;
    if(cast.length === 0) return null;
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='person' size={18} style={{ marginTop: 24, marginBottom: 4 }} />
                <Text style={CastStyles.castTitle}>{' '}Cast</Text>
            </View>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={cast}
                renderItem={({item}) => <CastCard item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

export default MovieCast;

const CastStyles = StyleSheet.create({
    castTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 18,
        marginBottom: 4,
        marginTop: 24,
        color: Colors.black
    }
});