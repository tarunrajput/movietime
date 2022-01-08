import React from 'react';
import { View, SafeAreaView, Platform, StyleSheet, StatusBar } from 'react-native';
import Colors from '@/Constants/Colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const Container = ({ children }) => {
    if (Platform.OS === "ios") {
        return <View style={containerStyles.container}>{children}</View>;
    } else {
        return <SafeAreaView style={containerStyles.container}>{children}</SafeAreaView>;
    }
}

export default Container;

const containerStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight,
        backgroundColor: Colors.white
    }
});