import React, {useEffect, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {useThemeColors} from '@/lib/theme';
import type {Genre} from '@/types';

interface MovieGenresTagsProps {
  genres: Genre[];
}

export function MovieGenresTags({genres}: MovieGenresTagsProps) {
  if (!genres || genres.length === 0) return null;

  return (
    <View style={styles.genresContainer}>
      {genres.map((item, index) => (
        <GenreTag key={item.id} genre={item} index={index} />
      ))}
    </View>
  );
}

function GenreTag({genre, index}: {genre: Genre; index: number}) {
  const colors = useThemeColors();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(index * 60, withTiming(1, {duration: 300}));
    scale.value = withDelay(index * 60, withTiming(1, {duration: 300}));
  }, [index, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  const s = useMemo(() => createStyles(colors), [colors]);

  return (
    <Animated.View style={[s.block, animatedStyle]}>
      <Text style={[s.genreLabel, {color: colors.secondary}]}>
        {genre.name}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  genresContainer: {flexDirection: 'row', flexWrap: 'wrap', width: '80%'},
});

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    block: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: colors.secondary,
      borderRadius: 4,
      marginRight: 4,
      marginBottom: 4,
    },
    genreLabel: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 12,
    },
  });
