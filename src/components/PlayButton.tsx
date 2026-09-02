import React, {useEffect, useMemo} from 'react';
import Icon from '@expo/vector-icons/FontAwesome5';
import {Linking, Pressable, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {getTrailerUrl} from '@/lib/services/tmdb';
import {useThemeColors} from '@/lib/theme';
import type {Video} from '@/types';

interface PlayButtonProps {
  videos?: {results: Video[]};
}

export function PlayButton({videos}: PlayButtonProps) {
  const colors = useThemeColors();
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.08, {duration: 1000}),
        withTiming(1, {duration: 1000}),
      ),
      -1,
    );
  }, [pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: pulse.value}],
  }));

  const s = useMemo(() => createStyles(colors), [colors]);

  const trailerUrl = getTrailerUrl(videos);

  if (!trailerUrl) return null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Play trailer"
      style={s.container}
      hitSlop={8}
      onPress={() => Linking.openURL(trailerUrl)}>
      <Animated.View style={[s.iconContainer, animatedStyle]}>
        <Icon name="play" size={26} color={colors.onPrimary} style={s.icon} />
      </Animated.View>
    </Pressable>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      right: 0,
      top: -32,
      marginRight: 20,
      zIndex: 10,
    },
    iconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      // Soft elevation shadow instead of a ring: reads cleanly over both the
      // backdrop above and the sheet below without a grey halo.
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.35,
      shadowRadius: 6,
      elevation: 8,
    },
    icon: {
      // FontAwesome5's play glyph is optically left-shifted in its box
      transform: [{translateX: 2.5}],
    },
  });
