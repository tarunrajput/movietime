import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import Colors from '@/Constants/Colors';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const BackBtn = ({ navigation, style, color = Colors.white }) => {
    return (
        <View style={style}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-ios" size={30} style={{ color: color }} />
            </TouchableWithoutFeedback>
        </View>
    );
}

export default BackBtn;