import React from "react";
import { View, FlatList, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import Poster from '@/Components/common/Poster';
import { getImageUrl } from '@/utils/utils';
import Colors from '@/Constants/Colors';
import { useRoute } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import Icon from 'react-native-vector-icons/MaterialIcons';

const RecommendationsItem = (data, navigation, route) => {
    const imageUrl = getImageUrl(data.poster_path, "uri", "w185");
    return (
        <TouchableWithoutFeedback onPress={() => navigation.push(route, { id: data.id })}>
            <View>
                <View style={[RecommendationsStyles.imagePlaceholder, RecommendationsStyles.movieRecommendImages]}>
                    <FastImage source={imageUrl} style={RecommendationsStyles.movieRecommendImages} />
                </View>
                <Text style={[RecommendationsStyles.bottomText, { width: 100 }]} numberOfLines={2}>
                    {data.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const Recommendations = ({ movieRecommendations = {}, navigation }) => {
    const { results = [] } = movieRecommendations;
    const recommendedMovies = results.slice(0, 10);
    const route = useRoute().name;

    if (recommendedMovies.length === 0) return null;
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='recommend' size={18} style={{ marginTop: 24, marginBottom: 4 }} />
                <Text style={RecommendationsStyles.recommendationsTitle}>{' '}Recommendations</Text>
            </View>
            <FlatList
                data={recommendedMovies}
                horizontal
                renderItem={({ item }) => RecommendationsItem(item, navigation, route)}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

export default Recommendations;

const RecommendationsStyles = StyleSheet.create({
    recommendationsTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 18,
        marginBottom: 4,
        marginTop: 24,
        color: Colors.black
    },
    imagePlaceholder: {
        backgroundColor: Colors.gray,
    },
    movieRecommendImages: {
        height: 150,
        width: 100,
        marginRight: 8,
        borderRadius: 10,
    },
    bottomText: {
        marginTop: 4,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        width: 85,
        padding: 1,
        textAlign: 'center',
        color: Colors.black
    },
})