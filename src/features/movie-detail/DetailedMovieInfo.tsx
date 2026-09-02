import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {useThemeColors} from '@/lib/theme';
import {MovieGenresTags} from './MovieGenresTags';
import {Overview} from './Overview';
import {Cast} from './Cast';
import {MovieImages} from './Images';
import {WatchProviders} from './WatchProviders';
import {Recommendations} from './Recommendations';
import {PlayButton} from '@/components/PlayButton';
import type {MovieDetail, TVShowDetail} from '@/types';

type MediaDetail = MovieDetail | TVShowDetail;

interface DetailedMovieInfoProps {
  isLoaded: boolean;
  movieDetail: Partial<MediaDetail>;
}

export function DetailedMovieInfo({
  isLoaded,
  movieDetail,
}: DetailedMovieInfoProps) {
  const colors = useThemeColors();
  const videos = movieDetail.videos?.results ?? [];

  // Container slide-up animation
  const containerTranslateY = useSharedValue(40);
  const containerOpacity = useSharedValue(0);

  useEffect(() => {
    containerTranslateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
    containerOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
  }, [containerTranslateY, containerOpacity]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{translateY: containerTranslateY.value}],
  }));

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Animated.View
        style={[
          styles.movieDetail,
          containerStyle,
          {backgroundColor: colors.surface},
        ]}>
        {isLoaded && (
          <View>
            <MovieGenresTags genres={movieDetail.genres ?? []} />
            <WatchProviders
              providers={(movieDetail as MovieDetail)['watch/providers'] as any}
            />
            {movieDetail.overview ? (
              <Overview overview={movieDetail.overview} />
            ) : null}
            <Cast castDetail={movieDetail.credits} />
            <MovieImages movieImages={movieDetail.images} />
            <Recommendations
              movieRecommendations={movieDetail.recommendations}
            />
          </View>
        )}
      </Animated.View>
      {videos.length > 0 && <PlayButton videos={movieDetail.videos} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  movieDetail: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});
