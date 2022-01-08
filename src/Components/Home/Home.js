import React, { Component } from 'react';
import HomeHeader from './HomeHeader';
import Title from '@/Components/common/Title';
import Screen from '@/Components/common/Screen';
import { ScrollView } from 'react-native';
import MoviesRow from './MoviesRow';
import Swiper from 'react-native-swiper';
import SwipeCard from './SwipeCard';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }

    onRefresh = async () => {
        this.setState({ isRefreshing: true });
        await this.props.onRefresh();
        this.setState({ isRefreshing: false });
    };

    renderMoviesRows = () => {
        const { navigation, data = [], subTitle, type } = this.props;
        return subTitle.map((title, index) => (
            <MoviesRow key={index} data={{ ...data[index] }.results} title={title.label} icon={title.icon} navigation={navigation} type={type} />
        ));
    }

    render() {
        const { navigation, type, trending = [] } = this.props;
        return (
            <Screen>
                <HomeHeader
                    navigation={navigation}
                    type={type}
                />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Title type={type} />
                    <Swiper
                        autoplay
                        autoplayTimeout={3}
                        showsPagination={false}
                        height={255}
                    >
                        {
                            trending.map(movie => (<SwipeCard key={movie.id} type={type} info={movie} navigation={navigation} />))
                        }
                    </Swiper>
                    {this.renderMoviesRows()}
                </ScrollView>
            </Screen>
        )
    }
}

export default Home;