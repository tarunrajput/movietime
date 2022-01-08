import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '@/Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PersonInfo = ({ info }) => {
    const { known_for = [] } = info;
    const movies = known_for.map(item => {
        const { media_type = '' } = item;
        return media_type === 'movie' ? item.title : item.name;
    });
    const moviesText = movies.join(', ');

    return (
        <View style={{ flex: 1 }}>
            <Text style={PersonInfoStyles.actorName} numberOfLines={2}>{info.name}</Text> 
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='person' color={Colors.darkGray} />
                <Text style={PersonInfoStyles.mediaType}>{' Actor'}</Text>
            </View>
            {
                movies.length > 1 && <Text numberOfLines={3} style={PersonInfoStyles.moviesTxt} >{moviesText}</Text>
            }
        </View>
    );
}

export default PersonInfo;

const PersonInfoStyles = StyleSheet.create({
    actorName: {
        fontFamily: "Montserrat-Bold",
        fontSize: 14,
        paddingBottom: 10,
    },
    mediaType: {
        fontFamily: "Montserrat",
        color: Colors.darkGray
    },
    moviesTxt: {
        fontFamily: "Montserrat",
        fontSize: 12,
        marginTop: 10,
        width: "90%",
    }
})