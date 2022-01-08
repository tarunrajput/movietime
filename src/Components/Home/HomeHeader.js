import  React, { Component } from 'react';
import DrawerIcon from '@/Components/common/DrawerIcon';
import SearchIcon from '@/Components/common/SearchIcon';
import { View } from 'react-native';

class HomeHeader extends Component {
    render() {
        const { navigation, type } = this.props;
        return (
            <View style={{ margin: 16, flexDirection: "row", justifyContent: "space-between" }}>
                <DrawerIcon navigation={navigation} />
                <SearchIcon navigation={navigation} type={type} />
            </View>
        );
    }
}

export default HomeHeader;