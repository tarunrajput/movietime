import React, {useEffect, useState} from 'react';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {QueryProvider} from '@/state';
import {ThemeProvider, darkColors, lightColors} from '@/lib/theme';
import {AnimatedSplashScreen} from '@/components/AnimatedSplashScreen';

// Keep the native splash screen visible while we prepare
SplashScreen.preventAutoHideAsync();

const navLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: lightColors.primary,
    background: lightColors.background,
    card: lightColors.surface,
    text: lightColors.text,
    border: lightColors.border,
    notification: lightColors.gold,
  },
};

const navDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: darkColors.primary,
    background: darkColors.background,
    card: darkColors.surface,
    text: darkColors.text,
    border: darkColors.border,
    notification: darkColors.gold,
  },
};

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar
        barStyle={
          showSplash
            ? 'light-content'
            : colorScheme === 'dark'
              ? 'light-content'
              : 'dark-content'
        }
        translucent
        backgroundColor="transparent"
      />
      {showSplash ? (
        <AnimatedSplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <ThemeProvider>
          <QueryProvider>
            <NavThemeProvider
              value={colorScheme === 'dark' ? navDarkTheme : navLightTheme}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  contentStyle: {
                    backgroundColor:
                      colorScheme === 'dark'
                        ? darkColors.background
                        : lightColors.background,
                  },
                }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="search"
                  options={{animation: 'slide_from_bottom'}}
                />
                <Stack.Screen name="movie/[id]" />
                <Stack.Screen name="tv/[id]" />
                <Stack.Screen name="movie-list" />
              </Stack>
            </NavThemeProvider>
          </QueryProvider>
        </ThemeProvider>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
