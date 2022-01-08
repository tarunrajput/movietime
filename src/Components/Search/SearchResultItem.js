import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '@/utils/utils';
import Colors from '@/Constants/Colors';
import MovieOrTvShowInfo from './MovieOrTVShowInfo';
import PersonInfo from './PersonInfo';

const SearchResultItem = ({ data, navigation, type }) => {
    if (!data.poster_path && !data.profile_path) return null;
    let { media_type = '' } = data;
    media_type = media_type ? media_type : type;
    const isPersonType = media_type === 'person';
    if(isPersonType && data.known_for_department != 'Acting') return null;
    const imgURL = media_type === 'person' ? getImageUrl(data.profile_path) : getImageUrl(data.poster_path);
    const title = media_type === 'movie' ? data.title : data.name;
    return (
        <View style={SearchResultItemStyles.resultItemContainer} >
            <TouchableWithoutFeedback
                onPress={() => {
                    if (media_type === "tv") {
                        navigation.navigate("TVDetail", { id: data.id });
                    } else if (media_type === "movie") {
                        navigation.navigate("MovieDetail", { id: data.id });
                    }
                    else if (media_type === "person") {
                        navigation.navigate("ActorDetail", { id: data.id });
                    }
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <FastImage style={SearchResultItemStyles.resultImg} resizeMode="cover" source={imgURL} />
                    {
                        isPersonType ? <PersonInfo info={data} /> : <MovieOrTvShowInfo info={data} type={type} />
                    }
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default SearchResultItem;

const SearchResultItemStyles = StyleSheet.create({
    resultItemContainer: {
        marginHorizontal: 12,
        marginVertical: 8,
    },
    resultImg: {
        height: 110,
        width: 80,
        marginRight: 15 ,
        borderRadius: 8,
        backgroundColor: Colors.gray,
    }
})