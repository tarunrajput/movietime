import React from 'react';
import { View, StyleSheet } from 'react-native';
import MoviePlayBtn from '@/Components/MovieDetail/MoviePlayBtn';
import Colors from '@/Constants/Colors';
import MovieGenresTags from '@/Components/MovieDetail/MovieGenresTags';
import Overview from '@/Components/MovieDetail/Overview';
import MovieCast from '@/Components/MovieDetail/Cast';
import MovieImages from '@/Components/MovieDetail/Images';
import WatchProviders from '@/Components/MovieDetail/WatchProviders';
import Recommendations from '@/Components/MovieDetail/Recommendations';

const DetailedMovieInfo = (props) => {
    const { navigation, isLoaded, movieDetail } = props;
    const { results: videos = [] } = movieDetail.videos || {};
    return (
        <View style={DetailInfoStyles.detailedInfoContainer}>
            <View style={DetailInfoStyles.movieDetail}>
                {isLoaded && (
                    <View>
                        <MovieGenresTags genres={movieDetail.genres} />
                        <WatchProviders providers={movieDetail['watch/providers']} />
                        <Overview overview={movieDetail.overview} />
                        <MovieCast castDetail={movieDetail.credits} />
                        <MovieImages movieImages={movieDetail.images} />
                        <Recommendations movieRecommendations={movieDetail.recommendations} navigation={navigation} />
                    </View>
                )}
            </View>
            {videos.length != 0 && <MoviePlayBtn videos={movieDetail.videos} navigation={navigation} />}
        </View>
    );
}

export default DetailedMovieInfo;

const DetailInfoStyles = StyleSheet.create({
    detailedInfoContainer: {
        flex: 1,
        backgroundColor: Colors.black
    },
    movieDetail: {
        backgroundColor: Colors.white,
        flex: 1,
        padding: 16,
        paddingTop: 24,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    }
});