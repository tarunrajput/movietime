import React, {useMemo} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlashList} from '@shopify/flash-list';
import {Screen} from '@/components/Screen';
import {ScreenHeader} from '@/components/ScreenHeader';
import {SearchResultItem} from '@/features/search/SearchResultItem';
import {ErrorBoundary, MovieListSkeleton, ErrorState} from '@/components';
import {useCategoryInfinite} from '@/lib/hooks';
import type {MediaType, SearchResult} from '@/types';

/**
 * Paged list for one category (the "More" destination), with infinite scroll.
 */
function MovieListScreenContent() {
  const insets = useSafeAreaInsets();
  const {type, title} = useLocalSearchParams<{
    type: MediaType;
    title: string;
  }>();
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCategoryInfinite(type, title ?? '');

  const results = useMemo(
    () => data?.pages.flatMap(page => page.results) ?? [],
    [data],
  );

  if (isLoading) {
    return (
      <Screen>
        <MovieListSkeleton />
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen>
        <ErrorState
          message="Failed to load content"
          onRetry={() => refetch()}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScreenHeader
        title={`${title} ${type === 'movie' ? 'Movies' : 'TV Shows'}`}
      />
      <FlashList<SearchResult>
        data={results}
        renderItem={({item, index}) => (
          <SearchResultItem data={item} index={index} />
        )}
        keyExtractor={item => String(item.id)}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.footer} />
          ) : null
        }
        contentContainerStyle={{paddingBottom: insets.bottom + 16}}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

export default function MovieListScreen() {
  return (
    <ErrorBoundary>
      <MovieListScreenContent />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  footer: {paddingVertical: 16},
});
