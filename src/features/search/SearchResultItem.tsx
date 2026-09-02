import React, {memo, useCallback, useMemo} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {router} from 'expo-router';
import {Image} from 'expo-image';
import Animated from 'react-native-reanimated';
import {
  getPosterUrl,
  getProfileUrl,
  getPlaceholderUrl,
} from '@/lib/services/tmdb';
import {useAnimatedEntrance, useScalePress} from '@/lib/hooks';
import {useThemeColors} from '@/lib/theme';
import {MovieOrTvShowInfo} from './MovieOrTvShowInfo';
import {PersonInfo} from './PersonInfo';
import type {SearchResult} from '@/types';

interface SearchResultItemProps {
  data: SearchResult;
  index?: number;
}

export const SearchResultItem = memo(function SearchResultItem({
  data,
  index = 0,
}: SearchResultItemProps) {
  const colors = useThemeColors();
  const isPerson = data.media_type === 'person';
  const imageUrl = isPerson
    ? getProfileUrl(data.profile_path, 80)
    : getPosterUrl(data.poster_path, 80);

  const animatedStyle = useAnimatedEntrance(index, 60, 0);
  const {
    animatedStyle: scaleStyle,
    onPressIn,
    onPressOut,
  } = useScalePress(0.97);
  const handlePress = useCallback(() => {
    if (data.media_type !== 'person')
      router.push(
        data.media_type === 'tv' ? `/tv/${data.id}` : `/movie/${data.id}`,
      );
  }, [data.media_type, data.id]);

  const s = useMemo(() => createStyles(colors), [colors]);

  if (isPerson && data.known_for_department !== 'Acting') return null;
  if (!imageUrl) return null;

  return (
    <Animated.View style={[s.container, animatedStyle]}>
      <Pressable
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <Animated.View style={scaleStyle}>
          <View style={s.resultRow}>
            <Image
              style={s.resultImg}
              contentFit="cover"
              source={imageUrl}
              placeholder={
                getPlaceholderUrl(
                  isPerson ? data.profile_path : data.poster_path,
                  isPerson ? 'profile' : 'poster',
                ) ?? ''
              }
              placeholderContentFit="cover"
              transition={500}
            />
            {isPerson ? (
              <PersonInfo info={data} />
            ) : (
              <MovieOrTvShowInfo info={data} />
            )}
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
});

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {marginHorizontal: 12, marginVertical: 8},
    resultRow: {flexDirection: 'row'},
    resultImg: {
      height: 110,
      width: 80,
      marginRight: 16,
      borderRadius: 8,
      backgroundColor: colors.gray[400],
    },
  });
