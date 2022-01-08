import React from "react";
import { StatusBar, View, SafeAreaView, Platform, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Colors from '@/Constants/Colors';

const Container = ({ children }) => {
    if (Platform.OS === "ios") {
        return <View style={_styles.container}>{children}</View>;
    } else {
        return <SafeAreaView style={_styles.container}>{children}</SafeAreaView>;
    }
};

const WebViewComponent = ({ children }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Container>
                <StatusBar barStyle="dark-content" translucent />
                {children}
            </Container>
        </View>
    );
};

export default WebViewComponent;

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        marginTop: Platform.OS === "ios" ? getStatusBarHeight() : StatusBar.currentHeight,
    },
});
