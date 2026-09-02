import React, {useCallback, useState, useMemo} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/MaterialIcons';
import {SearchResultSkeleton} from '@/components';
import {SearchResultItem} from './SearchResultItem';
import {useThemeColors} from '@/lib/theme';
import type {GroupedResults} from '@/lib/hooks';
import type {SearchResult} from '@/types';

type FilterKey = 'all' | 'movies' | 'tvShows' | 'people';

interface SearchResultsProps {
  groupedResults: GroupedResults;
  query?: string;
  isLoading?: boolean;
}

interface ChipDef {
  key: FilterKey;
  label: string;
}

interface SectionItem {
  key: string;
  type: 'result';
  data: SearchResult;
  index: number;
}

export function SearchResults({
  groupedResults,
  query = '',
  isLoading,
}: SearchResultsProps) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  // Build chips — only show categories that have results
  const chips: ChipDef[] = useMemo(() => {
    const list: ChipDef[] = [{key: 'all', label: 'All'}];
    if (groupedResults.movies.length > 0) {
      list.push({
        key: 'movies',
        label: `Movies ${groupedResults.movies.length}`,
      });
    }
    if (groupedResults.tvShows.length > 0) {
      list.push({
        key: 'tvShows',
        label: `TV Shows ${groupedResults.tvShows.length}`,
      });
    }
    if (groupedResults.people.length > 0) {
      list.push({
        key: 'people',
        label: `People ${groupedResults.people.length}`,
      });
    }
    return list;
  }, [groupedResults]);

  // Filtered results based on active chip
  const sections: SectionItem[] = useMemo(() => {
    const items: SectionItem[] = [];
    let index = 0;

    const addItems = (source: SearchResult[], prefix: string) => {
      source.forEach(item => {
        items.push({
          key: `${prefix}-${item.id}`,
          type: 'result',
          data: item,
          index: index++,
        });
      });
    };

    if (activeFilter === 'all' || activeFilter === 'movies') {
      addItems(groupedResults.movies, 'movie');
    }
    if (activeFilter === 'all' || activeFilter === 'tvShows') {
      addItems(groupedResults.tvShows, 'tv');
    }
    if (activeFilter === 'all' || activeFilter === 'people') {
      addItems(groupedResults.people, 'person');
    }

    return items;
  }, [groupedResults, activeFilter]);

  const renderItem = useCallback(
    ({item}: {item: SectionItem}) => (
      <SearchResultItem data={item.data} index={item.index} />
    ),
    [],
  );

  // Chips header rendered as ListHeaderComponent
  const renderChips = useCallback(
    () => (
      <View style={styles.chipsContainer}>
        <View style={styles.chipsRow}>
          {chips.map(chip => {
            const isActive = chip.key === activeFilter;
            return (
              <Pressable
                key={chip.key}
                onPress={() => setActiveFilter(chip.key)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isActive
                      ? colors.primary
                      : colors.surfaceMuted,
                  },
                ]}>
                <Text
                  style={[
                    styles.chipText,
                    {color: isActive ? colors.onPrimary : colors.text},
                  ]}>
                  {chip.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    ),
    [chips, activeFilter, colors],
  );

  if (isLoading && sections.length === 0) {
    return (
      <View style={styles.skeletonContainer}>
        {[1, 2, 3, 4, 5].map(i => (
          <SearchResultSkeleton key={i} />
        ))}
      </View>
    );
  }

  if (!isLoading && sections.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="search-off" size={40} color={colors.textMuted} />
        <Text style={[styles.emptyTitle, {color: colors.text}]}>
          No results
        </Text>
        <Text style={[styles.emptyMessage, {color: colors.textMuted}]}>
          {query
            ? `Nothing found for "${query}". Try a different spelling or a broader term.`
            : 'Start typing to search movies, TV shows, and people.'}
        </Text>
      </View>
    );
  }

  return (
    <FlashList<SectionItem>
      style={styles.list}
      keyExtractor={item => item.key}
      keyboardShouldPersistTaps="handled"
      data={sections}
      ListHeaderComponent={chips.length > 1 ? renderChips : undefined}
      contentContainerStyle={[
        styles.content,
        {paddingBottom: insets.bottom + 16},
      ]}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {flex: 1},
  content: {marginVertical: 8},
  skeletonContainer: {paddingTop: 8},
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 8,
  },
  emptyTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyMessage: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    textAlign: 'center',
  },
  chipsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  chipText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
  },
});
