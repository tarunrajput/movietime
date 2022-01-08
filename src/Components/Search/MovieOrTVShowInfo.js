import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MovieRatingNRuntime from '../MovieDetail/MoveRating/MovieRatingNRuntime';
import Colors from '@/Constants/Colors';
import Genres from '@/Constants/Genres';
import { capitalize } from '@/utils/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MovieOrTvShowInfo = ({ info, type }) => {
    const { release_date = '', first_air_date = '', genre_ids = [] } = info;
    let { media_type = '' } = info;
    media_type = media_type ? media_type : type;
    const title = media_type === 'movie' ? info.title : info.name;
    const icon = media_type === 'movie' ? 'movie-filter' : 'live-tv';
    const releaseDate = media_type === 'movie' ? new Date(release_date) : new Date(first_air_date);
    const releaseYear = releaseDate.getFullYear();
    const genresText = genre_ids.map((genre) => Genres[genre.toString()].name).join(", ");
    return (
        <View style={{ flex: 1 }}>
            <Text style={InfoStyles.infoTitle} numberOfLines={2}>{title}</Text>
            <View style={{ flexDirection: 'row', paddingBottom: 5, alignItems: 'center'}} >
                <Icon name={icon} color={Colors.darkGray} />
                <Text style={InfoStyles.mediaType}>{` ${capitalize(media_type)}`}</Text>
                {!isNaN(releaseYear) && <Text style={InfoStyles.releaseYear}> • {releaseYear}</Text>}
            </View>
            <MovieRatingNRuntime rating={info.vote_average} textColor={Colors.darkGray} emptyStarColor={Colors.darkGray} />
            <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 12, marginTop: 10, width: "100%" }}>
                {genresText}
            </Text>
        </View>
    );
}

export default MovieOrTvShowInfo;

const InfoStyles = StyleSheet.create({
    infoTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 14,
        paddingBottom: 10,
    },
    mediaType: {
        color: Colors.darkGray,
        fontFamily: "Montserrat"
    },  
    releaseYear: {
        color: Colors.darkGray,
        fontFamily: "Montserrat"
    }
})