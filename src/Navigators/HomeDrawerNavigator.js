
import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import Colors from '@/Constants/Colors';
import Movies from '@/Screens/Movies';
import TVShows from '@/Screens/TVShows';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Movies"
            screenOptions={{
                drawerActiveBackgroundColor: "transparent",
                drawerActiveTintColor: Colors.blue,
                drawerInactiveTintColor: Colors.white,
                headerShown: false,
                drawerType: "slide",
                drawerStyle: {
                    width: "50%",
                    backgroundColor: Colors.white
                }
            }}
        >
            <Drawer.Screen
                name="Movies"
                component={Movies}
                color={Colors.primary}
                options={{
                    drawerLabel: ({ focused }) => drawerItemLabel(focused, "Movies"),
                }}
            />
            <Drawer.Screen
                name="TV Show"
                component={TVShows}
                color={Colors.primary}
                options={{
                    drawerLabel: ({ focused }) => drawerItemLabel(focused, "TV Shows"),
                }}
            />
        </Drawer.Navigator>
    );
}

const drawerItemLabel = (focused, title) => {
    const icon = title === 'TV Shows' ? 'live-tv' : 'movie-filter'
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name={icon} size={focused ? 20 : 16} color={Colors.primary} />
            <Text
                style={{
                    fontSize: focused ? 20 : 16,
                    fontWeight: null,
                    color: Colors.primary,
                    fontFamily: focused ? "Montserrat-Bold" : "Montserrat-Medium",
                }}
            >
                {` ${title}`}
            </Text>
        </View>
    );
};

export default HomeDrawerNavigator;