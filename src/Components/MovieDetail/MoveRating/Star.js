import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet } from 'react-native';

const Star = ({ color, rating = 10 }) => {
    const items = [];
    for (let i=0; i < 5; i++) {
        items.push(<Icon key={i} name="star" size={15} color={color} />);
    }
    return (
        <View style={[StarStyles.star, { width: 75 * (rating / 10) }]}>
            {items}
        </View>
    );
}

export default Star;

const StarStyles = StyleSheet.create({
    star: {
        position: 'absolute',
        overflow: 'hidden',
        flexDirection: 'row',
    }
});