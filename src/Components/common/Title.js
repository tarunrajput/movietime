import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { normalizeFont } from '@/utils/utils';
import Colors from '@/Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Title = (props) => {
    const { type } = props;
    const title = type === 'tv' ? 'TV Shows' : 'Movies';
    const titleIcon = type === 'tv' ? 'live-tv' : 'movie-filter';
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={titleIcon} size={normalizeFont(30)} style={{ marginBottom: 0, marginTop: 16, marginLeft: 16}} />
                <Text style={Styles.screenTitle}>
                    {` ${title}`}
                </Text>
            </View>
            <View style={Styles.screenTitleSeparator} />
        </View>
    );
}

export default Title;

const Styles = StyleSheet.create({
    screenTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: normalizeFont(30),
        margin: 16,
        marginLeft: 0,
        marginBottom: 0,
        color: Colors.black
    },
    screenTitleSeparator: {
        backgroundColor: Colors.primary,
        width: 38,
        height: 5,
        marginTop: 5,
        marginBottom: 12,
        marginLeft: 16
    }
});