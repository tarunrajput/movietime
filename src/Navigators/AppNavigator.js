import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeDrawerNavigator from './HomeDrawerNavigator';
import MovieDetail from '@/Screens/MovieDetail';
import TVDetail from '@/Screens/TVDetail';
import WebView from '@/Screens/WebView';
import Search from '@/Screens/Search';
import MovieList from '@/Screens/MovieList';

const Stack = createStackNavigator();

// @refresh reset
const AppNavigator = () => {
    return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Home'
                    screenOptions={{
                        headerTitle: false,
                        headerTrasnparent: true,
                        headerBackTitleVisible: false,
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Home" component={HomeDrawerNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="MovieDetail" component={MovieDetail} />
                    <Stack.Screen name="TVDetail" component={TVDetail} />
                    <Stack.Screen name="Webview" component={WebView} />
                    <Stack.Screen name="MovieList" component={MovieList} />
                    <Stack.Screen
                        name="Search"
                        component={Search}
                        options={{
                            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                            gestureDirection: "vertical",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
    );
};

export default AppNavigator;