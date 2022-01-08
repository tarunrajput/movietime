import React, { Component } from 'react';
import Home from '@/Components/Home/Home';
import TVShowsTypes from '@/Constants/TVShowsTypes';
import apiRequest from '@/config/apiRequest';

class TVShows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TVShowsData: [],
            trendingShows: []
        }
    }

    componentDidMount() {
        this.requestTVShows();
    }

    requestTVShows = async () => {
        const trendingShowsQueryOptions = {
            apiUrl: 'getTrendingMedia',
            appendUrl: 'tv/week'
        }
        const popularQueryOptions = {
            apiUrl: 'getPopularTVShows'
        }
        const topRatedQueryOptions = {
            apiUrl: 'getTopRatedTVShows'
        }
        const airingTodayQueryOptions = {
            apiUrl: 'getAiringTodayShows'
        }
        const onTheAirQueryOptions = {
            apiUrl: 'getOnTheAirShows'
        }
        const trendingShows = await apiRequest(trendingShowsQueryOptions);
        const popularShows = await apiRequest(popularQueryOptions);
        const topRatedShows = await apiRequest(topRatedQueryOptions);
        const airingTodayShows = await apiRequest(airingTodayQueryOptions);
        const onTheAirShows = await apiRequest(onTheAirQueryOptions);
        const TVShowsData = [popularShows, topRatedShows, airingTodayShows, onTheAirShows];
        const { results: _trendingShows = [] } = trendingShows;

        this.setState({ TVShowsData: TVShowsData, trendingShows: _trendingShows });
    };

    render() {
        return (
            <Home
                navigation={this.props.navigation}
                type={"tv"}
                data={this.state.TVShowsData}
                trending={this.state.trendingShows}
                subTitle={TVShowsTypes}
                onRefresh={this.requestTVShows}
            />
        );
    }
}

export default TVShows;