import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableNativeFeedback } from "react-native";
import Poster from '../common/Poster';
import { normalizeFont } from '@/utils/utils';
import Colors from '@/Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MoviesRow = ({ data, title, icon, navigation, type }) => {
    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={Styles.text}>
                    <Icon name={icon} size={normalizeFont(15)} />
                    {` ${title}`}
                </Text>
                <TouchableNativeFeedback onPress={() => navigation.navigate("MovieList", { data, type, title })}>
                    <Text style={Styles.textMore}>More</Text>
                </TouchableNativeFeedback>
            </View>
            <FlatList
                data={data}
                horizontal
                renderItem={({ item }) => <Poster item={item} navigation={navigation} type={type} />}
                keyExtractor={(item) => item.id.toString()}
                style={{ margin: 8, marginTop: 4 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default MoviesRow;

const Styles = StyleSheet.create({
    text: {
        fontSize: normalizeFont(15),
        margin: 16,
        marginBottom: 0,
        fontFamily: "Montserrat-SemiBold",
        color: Colors.black
    },

    textMore: {
        fontSize: normalizeFont(12),
        margin: 16,
        marginBottom: 0,
        fontFamily: "Montserrat-SemiBold",
        alignSelf: "flex-end",
        color: Colors.primary,
    },
});
