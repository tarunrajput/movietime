import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Colors from '@/Constants/Colors';
import BackBtn from '@/Components/common/BackBtn';
import BasicTVShowInfo from '@/Components/MovieDetail/BasicMovieInfo';
import DetailedTVShowInfo from '@/Components/MovieDetail/DetailedMovieInfo';
import apiRequest from '@/config/apiRequest';

const TVDetail = (props) => {
    const { navigation } = props;
    const [tvData, setTVData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => { getTVDetailInfo() }, [props.route.params.id]);

    const getTVDetailInfo = async () => {
        const { id: tvShowID } = props.route.params;
        const tvDetailQueryOptions = {
            apiUrl: 'getTVShowData',
            appendUrl: tvShowID,
            data: {
                append_to_response: "images,credits,videos,watch/providers,recommendations"
            }
        };
        const tvShowDetail = await apiRequest(tvDetailQueryOptions);
        setIsLoaded(true);
        setTVData(tvShowDetail);
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView>
                <BasicTVShowInfo
                    movieDetail={tvData}
                    isLoaded={isLoaded}
                />
                <DetailedTVShowInfo
                    movieDetail={tvData}
                    navigation={navigation}
                    isLoaded={isLoaded}
                />
            </ScrollView>
            <BackBtn navigation={navigation} style={{ marginLeft: 10, position: "absolute", top: 40 }} />
        </View>
    );
};

export default TVDetail;