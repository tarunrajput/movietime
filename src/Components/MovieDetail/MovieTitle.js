import React from 'react';
import { View, Text } from 'react-native';
import Colors from '@/Constants/Colors';

const MovieTitle = ({ title }) => {
    return (
        <View>
            <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 24, color: Colors.white }}>{title}</Text>
            <View style={{ width: 30, height: 5, backgroundColor: Colors.primary, marginTop: 4, marginBottom: 8 }} />
        </View>
    );
}

export default MovieTitle;