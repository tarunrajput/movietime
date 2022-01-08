import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Colors from '@/Constants/Colors';

const DrawerIcon = (props) => {
    const { navigation, type } = props;
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Search", { type: type })}>
            <Icon name="search" size={20} color={Colors.black} />
        </TouchableWithoutFeedback>
    );
}

export default DrawerIcon;