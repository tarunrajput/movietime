import React, {useMemo} from 'react';
import {Tabs} from 'expo-router';
import {useThemeColors} from '@/lib/theme';
import Icon from '@expo/vector-icons/MaterialIcons';
import type {ColorValue} from 'react-native';

function MoviesIcon({
  color,
  size,
}: {
  focused: boolean;
  color: ColorValue;
  size: number;
}) {
  return <Icon name="movie-filter" size={size} color={color as string} />;
}

function TVShowsIcon({
  color,
  size,
}: {
  focused: boolean;
  color: ColorValue;
  size: number;
}) {
  return <Icon name="live-tv" size={size} color={color as string} />;
}

export default function TabLayout() {
  const colors = useThemeColors();
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
      },
      tabBarLabelStyle: {
        fontFamily: 'Montserrat-Medium' as const,
        fontSize: 12,
      },
    }),
    [colors],
  );

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name="index" options={{href: null}} />
      <Tabs.Screen
        name="movies"
        options={{title: 'Movies', tabBarIcon: MoviesIcon}}
      />
      <Tabs.Screen
        name="tv-shows"
        options={{title: 'TV Shows', tabBarIcon: TVShowsIcon}}
      />
    </Tabs>
  );
}
