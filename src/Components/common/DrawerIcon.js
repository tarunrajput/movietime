import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";
import DrawerMenuIcon from '../../assets/icons/drawerIcon.png';

const DrawerIcon = (props) => {
    const { navigation } = props;
    return (
        <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
            <FastImage source={DrawerMenuIcon} style={{ width: 20, height: 20 }} />
        </TouchableWithoutFeedback>
    );
}

export default DrawerIcon;