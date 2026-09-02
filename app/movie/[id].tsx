import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {BasicMovieInfo} from '@/features/movie-detail/BasicMovieInfo';
import {DetailedMovieInfo} from '@/features/movie-detail/DetailedMovieInfo';
import {BackBtn} from '@/components/BackBtn';
import {MovieDetailSkeleton, ErrorState, ErrorBoundary} from '@/components';
import {useMediaDetail} from '@/lib/hooks';
import {useThemeColors} from '@/lib/theme';
import type {MovieDetail} from '@/types';

/**
 * Movie detail screen.
 * Uses useMediaDetail hook (Hooks pattern) for data fetching.
 * ErrorBoundary wraps for resilience.
 */
function MovieDetailScreenContent() {
  const colors = useThemeColors();
  const {id} = useLocalSearchParams<{id: string}>();
  const {data, isLoading, isError, refetch} = useMediaDetail(id!, 'movie');

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Failed to load movie details"
        onRetry={() => refetch()}
      />
    );
  }

  const movieDetail = data as MovieDetail | undefined;

  return (
    <View style={[styles.screen, {backgroundColor: colors.surface}]}>
      <ScrollView>
        <BasicMovieInfo
          movieDetail={movieDetail ?? {}}
          isLoaded={!!movieDetail}
        />
        <DetailedMovieInfo
          movieDetail={movieDetail ?? {}}
          isLoaded={!!movieDetail}
        />
      </ScrollView>
      <BackBtn style={styles.backBtn} />
    </View>
  );
}

export default function MovieDetailScreen() {
  return (
    <ErrorBoundary>
      <MovieDetailScreenContent />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backBtn: {
    marginLeft: 12,
    position: 'absolute',
    top: 40,
  },
});
