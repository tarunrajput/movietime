import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Colors from '@/Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OverView = ({ overview }) => {
    const [isTxtVisible, setIsTxtVisible] = useState(false);
    if (!overview) return null;
    return (
        <View>
            <Text style={MovieOverViewStyles.overviewTitle}><Icon name='text' size={18} />{' '}Plot Summary</Text>
            <TouchableWithoutFeedback onPress={() => setIsTxtVisible(!isTxtVisible)}>
                <Text numberOfLines={isTxtVisible ? 0 : 3} style={MovieOverViewStyles.overviewTxt}>{overview}</Text>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default OverView;

const MovieOverViewStyles = StyleSheet.create({
    overviewTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 18,
        marginBottom: 4,
        marginTop: 24,
        color: Colors.black
    },
    overviewTxt: {
        fontFamily: "Montserrat-Regular",
        color: Colors.black
    }
})