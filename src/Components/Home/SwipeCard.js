import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '@/utils/utils';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MovieRatingNRuntime from '../MovieDetail/MoveRating/MovieRatingNRuntime';
import Colors from '@/Constants/Colors';

const SwipeCard = ({ info = {}, type, navigation }) => {
    const backDropImageSrc = getImageUrl(info.backdrop_path, 'uri', 'original');
    const posterImageSrc = getImageUrl(info.poster_path, 'uri', 'original'); 
    const iconStar = (<Icon name="md-star" size={16} color="#F5B642" />);

    return (
        <View style={{ height: '100%', marginHorizontal: 12, paddingVertical: 4, justifyContent: 'center' }}>
            <FastImage source={backDropImageSrc} resizeMode={"cover"} style={SwipeCardStyles.imageStyle} />
            <LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0,0,0, 0.7)', 'rgba(0,0,0, 0.8)']} style={SwipeCardStyles.linearGradientImg} />
            <View style={SwipeCardStyles.cardContent}>
                <FastImage source={posterImageSrc} resizeMode={"cover"} style={SwipeCardStyles.cardImage} />
                <View style={SwipeCardStyles.cardDetails}>
                    <Text style={SwipeCardStyles.cardTitle} numberOfLines={2}>
                        {info.original_title || info.name}
                    </Text>
                    <Text style={SwipeCardStyles.cardGenre}>Action</Text>
                    <MovieRatingNRuntime rating={info.vote_average} style={{ paddingVertical: 6 }} />
                    <Text style={SwipeCardStyles.cardDescription} numberOfLines={2} >
                        {info.overview}
                    </Text>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => { 
                            if (type === "tv") {
                                navigation.navigate("TVDetail", { id: info.id });
                            } else {
                                navigation.navigate("MovieDetail", { id: info.id });
                            }
                        }
                    }
                    >
                        <View style={SwipeCardStyles.viewButton}>
                            <Text style={SwipeCardStyles.viewButtonText}><Icon name="ios-information-circle" size={14}  />{' '}More Info</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default SwipeCard;

const SwipeCardStyles = StyleSheet.create({
    imageStyle: {
        flex: 1,
        position: 'absolute',
        borderRadius: 8,
        width: '100%',
        height: '100%',
    },
    linearGradientImg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 8
    },
    cardContent: {
        height: '70%',
        position: 'absolute',
        right: 16,
        left: 16,
        flexDirection: 'row'
    },
    cardDetails: {
		paddingLeft: 10,
		flex: 1,
	},
    cardTitle: {
		color: 'white',
		fontSize: 20,
        fontFamily: 'Montserrat-Bold'
	},
    cardGenre: {
		fontSize: 12,
		color: 'white',
        fontFamily: 'Montserrat'
	},
    cardDescription: {
		color: '#fff',
        maxHeight: '25%',
		fontSize: 12,
		marginTop: 4,
        fontFamily: 'Montserrat',
        overflow: 'hidden'
	},
    viewButton: {
		justifyContent: 'center',
        alignItems: 'center',
		borderRadius: 4,
		backgroundColor: Colors.primary,
		width: '50%',
		height: '43%',
		marginTop: 10
	},
    viewButtonText: {
		color: 'white',
        fontFamily: 'Montserrat-Medium',
	},
    cardImage: {
		height: '100%',
		width: '35%',
		borderRadius: 4
	},
})