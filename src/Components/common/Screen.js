import React from 'react';
import { View, StatusBar } from 'react-native';
import Container from './Container';
import Colors from '@/Constants/Colors';

const Screen = ({ children }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Container>
                <StatusBar barStyle='dark-content' translucent />
                {children}
            </Container>
        </View>
    );
}

export default Screen;