import React, { Component } from 'react';
import Home from '@/Components/Home/Home';
import apiRequest from '@/config/apiRequest';
import MovieTypes from '@/Constants/MovieTypes';

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesData: [],
            trendingMovies: []
        };
    }

    componentDidMount() {
        this.requestMovies();
    }

    requestMovies = async () => {
        const trendingMoviesQueryOptions = {
            apiUrl: 'getTrendingMedia',
            appendUrl: 'movie/week'
        }
        const popularQueryOptions = {
            apiUrl: 'getPopularMovies'
        }
        const topRatedQueryOptions = {
            apiUrl: 'getTopRatedMovies'
        }
        const upcomingQueryOptions = {
            apiUrl: 'getUpcomingMovies'
        }
        const nowPlayingQueryOptions = {
            apiUrl: 'getNowPlayingMovies'
        }

        const trendingMovies = await apiRequest(trendingMoviesQueryOptions);
        const popularMovies = await apiRequest(popularQueryOptions);
        const topRatedMovies = await apiRequest(topRatedQueryOptions);
        const nowPlayingMovies = await apiRequest(nowPlayingQueryOptions);
        const upcomingMovies = await apiRequest(upcomingQueryOptions);
        const moviesData = [popularMovies, topRatedMovies, nowPlayingMovies, upcomingMovies];
        const { results: _trendingMovies = [] } = trendingMovies;
        this.setState({ moviesData: moviesData, trendingMovies: _trendingMovies });
    };

    render() {
        return (
            <Home
                navigation={this.props.navigation}
                type={"movie"}
                data={this.state.moviesData}
                trending={this.state.trendingMovies}
                subTitle={MovieTypes}
                onRefresh={this.requestMovies}
            />
        );
    }
}

export default Movies;