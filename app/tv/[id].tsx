import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {BasicMovieInfo} from '@/features/movie-detail/BasicMovieInfo';
import {DetailedMovieInfo} from '@/features/movie-detail/DetailedMovieInfo';
import {BackBtn} from '@/components/BackBtn';
import {MovieDetailSkeleton, ErrorState, ErrorBoundary} from '@/components';
import {useMediaDetail} from '@/lib/hooks';
import {useThemeColors} from '@/lib/theme';
import type {TVShowDetail} from '@/types';

/**
 * TV show detail screen.
 * Uses useMediaDetail hook (Hooks pattern) for data fetching.
 */
function TVDetailScreenContent() {
  const colors = useThemeColors();
  const {id} = useLocalSearchParams<{id: string}>();
  const {data, isLoading, isError, refetch} = useMediaDetail(id!, 'tv');

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Failed to load TV show details"
        onRetry={() => refetch()}
      />
    );
  }

  const tvData = data as TVShowDetail | undefined;

  return (
    <View style={[styles.screen, {backgroundColor: colors.surface}]}>
      <ScrollView>
        <BasicMovieInfo movieDetail={tvData ?? {}} isLoaded={!!tvData} />
        <DetailedMovieInfo movieDetail={tvData ?? {}} isLoaded={!!tvData} />
      </ScrollView>
      <BackBtn style={styles.backBtn} />
    </View>
  );
}

export default function TVDetailScreen() {
  return (
    <ErrorBoundary>
      <TVDetailScreenContent />
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
