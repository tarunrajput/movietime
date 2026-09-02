import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import {BackDrop} from './BackDrop';
import {MovieTitle} from './MovieTitle';
import {MovieRuntimeRating} from '@/components/MovieRuntimeRating';
import type {MovieDetail, TVShowDetail} from '@/types';

type MediaDetail = MovieDetail | TVShowDetail;

interface BasicMovieInfoProps {
  isLoaded: boolean;
  movieDetail: Partial<MediaDetail>;
}

export function BasicMovieInfo({isLoaded, movieDetail}: BasicMovieInfoProps) {
  const isMovie = 'title' in movieDetail;
  const backdrop_path = movieDetail.backdrop_path;
  const releaseDate = new Date(
    isMovie
      ? ((movieDetail as Partial<MovieDetail>).release_date ?? '')
      : ((movieDetail as Partial<TVShowDetail>).first_air_date ?? ''),
  );
  const releaseYear = releaseDate.getFullYear();
  const title = isMovie
    ? (movieDetail as Partial<MovieDetail>).title
    : (movieDetail as Partial<TVShowDetail>).name;
  const displayTitle =
    title && !isNaN(releaseYear) ? `${title} (${releaseYear})` : (title ?? '');

  // Content entrance animation
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(20);

  useEffect(() => {
    contentOpacity.value = withDelay(
      100,
      withTiming(1, {duration: 500, easing: Easing.out(Easing.cubic)}),
    );
    contentTranslateY.value = withDelay(
      100,
      withTiming(0, {duration: 500, easing: Easing.out(Easing.cubic)}),
    );
  }, [contentOpacity, contentTranslateY]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{translateY: contentTranslateY.value}],
  }));

  return (
    <BackDrop backDropPath={backdrop_path ?? null}>
      {isLoaded && (
        <Animated.View style={contentStyle}>
          <MovieTitle title={displayTitle} />
          <MovieRuntimeRating
            rating={movieDetail.vote_average ?? 0}
            runtime={
              isMovie
                ? (movieDetail as Partial<MovieDetail>).runtime
                : undefined
            }
          />
        </Animated.View>
      )}
    </BackDrop>
  );
}
