import React, {memo, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {router} from 'expo-router';
import {Image} from 'expo-image';
import Icon from '@expo/vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  getBackdropUrl,
  getPosterUrl,
  getPlaceholderUrl,
} from '@/lib/services/tmdb';
import {MovieRuntimeRating} from '@/components/MovieRuntimeRating';
import {useScalePress} from '@/lib/hooks';
import {useThemeColors} from '@/lib/theme';
import type {MediaType, Movie, TVShow} from '@/types';

interface SwipeCardProps {
  info: Movie | TVShow;
  type: MediaType;
}

export const SwipeCard = memo(function SwipeCard({info, type}: SwipeCardProps) {
  const colors = useThemeColors();
  const {width: windowWidth} = useWindowDimensions();
  const title = 'title' in info ? info.title : info.name;
  const {
    animatedStyle: scaleStyle,
    onPressIn,
    onPressOut,
  } = useScalePress(0.97);

  const contentOpacity = useSharedValue(0);
  const contentTranslate = useSharedValue(15);

  useEffect(() => {
    contentOpacity.value = withTiming(1, {duration: 400});
    contentTranslate.value = withTiming(0, {duration: 400});
  }, [contentOpacity, contentTranslate]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{translateX: contentTranslate.value}],
  }));

  const s = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <View style={styles.imageStyle}>
        <Image
          source={getBackdropUrl(info.backdrop_path, windowWidth) ?? ''}
          placeholder={getPlaceholderUrl(info.backdrop_path, 'backdrop') ?? ''}
          placeholderContentFit="cover"
          transition={500}
          contentFit="cover"
          style={StyleSheet.absoluteFill}
        />
      </View>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.85)']}
        locations={[0, 0.35, 0.85]}
        style={styles.overlay}
      />
      <Animated.View style={[styles.cardContent, contentStyle]}>
        <Image
          source={
            getPosterUrl(
              info.poster_path,
              Math.round((windowWidth - 56) * 0.35),
            ) ?? ''
          }
          placeholder={getPlaceholderUrl(info.poster_path, 'poster') ?? ''}
          placeholderContentFit="cover"
          transition={500}
          contentFit="cover"
          style={styles.cardImage}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {title}
          </Text>
          <MovieRuntimeRating
            rating={info.vote_average}
            textColor={colors.onMedia}
          />
          <Text style={styles.cardDescription} numberOfLines={2}>
            {info.overview}
          </Text>
          <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
            accessibilityRole="button"
            accessibilityLabel={`More info about ${title}`}
            onPress={() =>
              router.push(
                (type === 'tv' ? `/tv/${info.id}` : `/movie/${info.id}`) as any,
              )
            }>
            <Animated.View style={[s.viewButton, scaleStyle]}>
              <Text style={styles.viewButtonText}>
                <Icon name="information-circle" size={14} /> More Info
              </Text>
            </Animated.View>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    height: '100%',
    marginHorizontal: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardContent: {
    height: '70%',
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
  },
  cardDetails: {paddingLeft: 12, flex: 1, justifyContent: 'center'},
  cardTitle: {color: 'white', fontSize: 20, fontFamily: 'Montserrat-Bold'},
  cardDescription: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Montserrat-Regular',
    overflow: 'hidden',
  },
  viewButtonText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  cardImage: {height: '100%', width: '35%', borderRadius: 4},
});

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    viewButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: colors.primary,
      paddingHorizontal: 14,
      paddingVertical: 12,
      alignSelf: 'flex-start',
      marginTop: 8,
    },
  });
