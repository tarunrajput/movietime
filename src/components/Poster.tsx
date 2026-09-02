import React, {memo, useCallback, useMemo} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {router} from 'expo-router';
import {Image} from 'expo-image';
import {getPosterUrl, getPlaceholderUrl} from '@/lib/services/tmdb';
import {useThemeColors} from '@/lib/theme';
import {useScalePress} from '@/lib/hooks';
import Animated from 'react-native-reanimated';
import type {MediaType} from '@/types';

interface PosterProps {
  item: {id: number; poster_path: string | null};
  type: MediaType;
}

export const Poster = memo(function Poster({item, type}: PosterProps) {
  const colors = useThemeColors();
  const imageUrl = getPosterUrl(item.poster_path, 120);
  const {animatedStyle, onPressIn, onPressOut} = useScalePress(0.93);
  const handlePress = useCallback(
    () =>
      router.push(
        (type === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`) as any,
      ),
    [type, item.id],
  );

  const s = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View style={animatedStyle}>
        <View style={[s.imageContainer, {backgroundColor: colors.gray[200]}]}>
          <Image
            style={styles.posterImage}
            contentFit="cover"
            source={imageUrl ?? ''}
            placeholder={getPlaceholderUrl(item.poster_path, 'poster') ?? ''}
            placeholderContentFit="cover"
            transition={500}
            recyclingKey={item.poster_path ?? String(item.id)}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  posterImage: {height: 180, width: 120},
});

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    imageContainer: {
      margin: 4,
      backgroundColor: colors.gray[200],
      borderRadius: 8,
      overflow: 'hidden',
    },
  });
