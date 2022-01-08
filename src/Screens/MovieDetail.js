import React, { Component } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import BasicMovieInfo from '@/Components/MovieDetail/BasicMovieInfo';
import DetailedMovieInfo from '@/Components/MovieDetail/DetailedMovieInfo';
import apiRequest from '@/config/apiRequest';
import Colors from '@/Constants/Colors';
import BackBtn from '@/Components/common/BackBtn';
class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieDetail: {},
            isLoaded: false,
        }
    }

    componentDidMount() {
        this.getMovieDetailInfo();
    }

    getMovieDetailInfo = async () => {
        const { id: movieID } = this.props.route.params;
        const movieDetailQueryOptions = {
            apiUrl: 'getMovieData',
            appendUrl: movieID,
            data: {
                append_to_response: "images,credits,videos,watch/providers,recommendations"
            }
        };
        const movieDetail = await apiRequest(movieDetailQueryOptions);
        this.setState({
            movieDetail: movieDetail,
            isLoaded: true
        })
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView>
                    <BasicMovieInfo
                        movieDetail={this.state.movieDetail}
                        isLoaded={this.state.isLoaded}
                    />
                    <DetailedMovieInfo
                        movieDetail={this.state.movieDetail}
                        navigation={navigation}
                        isLoaded={this.state.isLoaded}
                    />
                </ScrollView>
                <BackBtn navigation={navigation} style={{ marginLeft: 10, position: "absolute", top: 40 }} />
            </View >
        );
    }
}

export default MovieDetail;