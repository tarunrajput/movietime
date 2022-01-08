import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '@/Components/common/Screen';
import BackBtn from '@/Components/common/BackBtn';
import Colors from '@/Constants/Colors';
import MovieShowList from '@/Components/common/MovieShowList';
import apiRequest from '@/config/apiRequest';
import SearchResults from '@/Components/Search/SearchResults';

const MovieList = (props) => {
    const { navigation } = props;
    const { type, title, data } = props.route.params;
    const [page, setPage] = useState(1);
    const [movieData, setMovieData] = useState(data);


    const prepareQueryString = () => {
        let queryString = {
            apiUrl: '',
            data: {
                page: page + 1
            }
        };

        if(type === 'movie') {
            switch(title) {
                case 'Popular':
                    queryString.apiUrl = 'getPopularMovies';
                    break;
                case 'Top Rated':
                    queryString.apiUrl = 'getTopRatedMovies';
                    break;
                case 'Now Playing':
                    queryString.apiUrl = 'getNowPlayingMovies';
                    break;
                case 'Upcoming':
                    queryString.apiUrl = 'getUpcomingMovies';
                    break;
            } 
        }
        else if(type === 'tv') {
            switch(title) {
                case 'Popular':
                    queryString.apiUrl = 'getPopularTVShows';
                    break;
                case 'Top Rated':
                    queryString.apiUrl = 'getTopRatedTVShows';
                    break;
                case 'Airing Today':
                    queryString.apiUrl = 'getAiringTodayShows';
                    break;
                case 'On The Air':
                    queryString.apiUrl = 'getOnTheAirShows';
                    break;
            }
        }
        return queryString;
    };
    
    const requestMediaData = async () => {
        return await apiRequest(prepareQueryString());
    }

    const onReachEnd = async () => {
        const response = await requestMediaData();
        if (response) {
            setPage(page + 1);
            setMovieData([...movieData, ...response.results]);
        }
    };

    return (
        <Screen>
            <View>
                <View style={{ flexDirection: 'row', marginTop: 24 }}>
                    <BackBtn style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} color={Colors.black} navigation={navigation} />
                    <Text style={MovieListStyles.headerTitle}>{`${title} ${type === 'movie' ? 'Movies' : 'TV Shows'}`}</Text>
                    <View style={{ flex: 1, paddingRight: 12 }}></View>
                </View>
                <View style={MovieListStyles.titleBar} />
            </View>
            <SearchResults results={movieData} navigation={navigation} onReachEnd={onReachEnd} type={type} />
        </Screen>
    );
}

export default MovieList;

const MovieListStyles = StyleSheet.create({
    headerTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        flex: 8, 
        textAlign: "center",
        alignSelf: "center",
        color: Colors.black
    },
    titleBar: {
        width: 40,
        height: 5,
        backgroundColor: Colors.primary,
        marginTop: 4,
        marginBottom: 12,
        alignSelf: "center",
    },
});