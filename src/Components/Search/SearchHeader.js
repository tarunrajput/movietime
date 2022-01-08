import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import BackBtn from '@/Components/common/BackBtn';
import Colors from '@/Constants/Colors';

const SearchHeader = ({ navigation, route }) => {
    return (
        <View>
            <View style={{ flexDirection: "row", marginTop: 24 }}>
                <BackBtn style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} color={Colors.black} navigation={navigation} />
                <Text style={SearchHeaderStyles.headerTitle}>Find Movies, TV Shows...</Text>
                <View style={{ flex: 1, paddingRight: 12 }}></View>
            </View>
            <View style={SearchHeaderStyles.searchTitleBar} />
        </View>
    );
}

export default SearchHeader;

const SearchHeaderStyles = StyleSheet.create({
    headerTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        flex: 8,
        textAlign: "center",
        alignSelf: "center",
        color: Colors.black
    },
    searchTitleBar: {
        width: 40,
        height: 5,
        backgroundColor: Colors.primary,
        marginTop: 4,
        marginBottom: 12,
        alignSelf: "center",
    },
})