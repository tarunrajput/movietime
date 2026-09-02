import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlashList} from '@shopify/flash-list';
import {HomeHeader} from './HomeHeader';
import {MoviesRow} from './MoviesRow';
import {TrendingCarousel} from './TrendingCarousel';
import {Title} from '@/components/Title';
import {Screen} from '@/components/Screen';
import {HomeSkeleton} from '@/components/LoadingState';
import {useTrending, useAllCategories, getCategories} from '@/lib/hooks';
import {spacing} from '@/lib/theme';
import type {MediaType} from '@/types';

interface HomeProps {
  type: MediaType;
}

export function Home({type}: HomeProps) {
  const insets = useSafeAreaInsets();
  // Queries for the non-active media type are disabled via `enabled`, so a
  // tab visit costs 4 category fetches + 1 trending fetch, not 10.
  const trendingQ = useTrending(type);
  const categoriesQ = useAllCategories(type);

  const trending = trendingQ.data?.results ?? [];
  const categories = getCategories(type);

  const renderCategoryRow = useCallback(
    ({index}: {item: unknown; index: number}) => {
      const category = categories[index];
      return (
        <MoviesRow
          data={categoriesQ.data?.[index]?.results}
          title={category.label}
          icon={category.icon}
          type={type}
        />
      );
    },
    [categories, categoriesQ.data, type],
  );

  if (trendingQ.isLoading || categoriesQ.isLoading) {
    return (
      <Screen>
        <HomeHeader type={type} />
        <HomeSkeleton />
      </Screen>
    );
  }

  return (
    <Screen>
      <HomeHeader type={type} />
      <FlashList
        data={categories}
        renderItem={renderCategoryRow}
        keyExtractor={category => category.label}
        showsVerticalScrollIndicator={false}
        style={styles.flashList}
        contentContainerStyle={{paddingBottom: insets.bottom + spacing.lg}}
        ListHeaderComponent={
          <>
            <Title type={type} />
            {trending.length > 0 && (
              <TrendingCarousel data={trending} type={type} />
            )}
          </>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flashList: {
    flex: 1,
  },
});
