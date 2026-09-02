import React, {useRef, useEffect, useMemo} from 'react';
import {View, TextInput, Text, Pressable, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/Feather';
import MCI from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {useSearch} from '@/lib/hooks';
import {useThemeColors} from '@/lib/theme';
import {SearchResults} from './ResultsList';

const SUGGESTIONS = [
  {label: 'Action', icon: 'flash'},
  {label: 'Comedy', icon: 'emoticon-excited'},
  {label: 'Sci-Fi', icon: 'robot'},
  {label: 'Horror', icon: 'ghost'},
  {label: 'Drama', icon: 'drama-masks'},
  {label: 'Marvel', icon: 'shield-half-full'},
  {label: 'Netflix', icon: 'television-classic'},
  {label: 'Anime', icon: 'star-four-points'},
] as const;

export function SearchBox() {
  const colors = useThemeColors();
  const inputRef = useRef<TextInput>(null);
  const {
    query,
    setQuery,
    clearQuery,
    debouncedQuery,
    groupedResults,
    isSearching,
    hasSearched,
  } = useSearch();
  const highlightOpacity = useSharedValue(0);
  const prevActiveRef = useRef(false);

  const isActive = query.length >= 2;
  const isCleared = query.length === 0;

  useEffect(() => {
    const wasActive = prevActiveRef.current;
    prevActiveRef.current = isActive;

    if (isActive && !wasActive) {
      highlightOpacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
    } else if (isCleared) {
      highlightOpacity.value = withTiming(0, {duration: 200});
    }
  }, [isActive, isCleared, highlightOpacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: highlightOpacity.value,
  }));

  const s = useMemo(() => createStyles(colors), [colors]);

  const handleSuggestion = (label: string) => {
    setQuery(label);
    inputRef.current?.focus();
  };

  return (
    <>
      <View style={s.searchBoxWrapper}>
        <Animated.View style={[s.highlightOverlay, animatedStyle]} />
        <View style={s.searchBoxContainer}>
          <Icon
            name="search"
            size={20}
            color={colors.text}
            style={s.searchIcon}
          />
          <View style={s.inputWrapper}>
            <TextInput
              ref={inputRef}
              style={s.searchInput}
              placeholder="Search movies, TV shows, actors..."
              placeholderTextColor={colors.textMuted}
              onChangeText={setQuery}
              value={query}
              returnKeyType="search"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
          {query.length > 0 && (
            <Pressable
              onPress={clearQuery}
              style={s.clearBtn}
              hitSlop={4}
              accessibilityRole="button"
              accessibilityLabel="Clear search">
              <Icon name="x" size={18} color={colors.textMuted} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Suggestion chips — shown when query is empty or hasn't triggered search yet */}
      {!hasSearched && (
        <View style={s.suggestionsContainer}>
          <Text style={s.suggestionsLabel}>Try searching for</Text>
          <View style={s.chipsRow}>
            {SUGGESTIONS.map(item => (
              <Pressable
                key={item.label}
                style={s.chip}
                hitSlop={4}
                onPress={() => handleSuggestion(item.label)}>
                <MCI name={item.icon} size={14} color={colors.textMuted} />
                <Text style={s.chipText}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Search results — flex container keeps the list bounded below the
          input so rows can never render behind it while scrolling */}
      {(hasSearched || isSearching) && (
        <View style={s.resultsContainer}>
          <SearchResults
            groupedResults={groupedResults}
            query={debouncedQuery}
            isLoading={
              isSearching &&
              !groupedResults.movies.length &&
              !groupedResults.tvShows.length &&
              !groupedResults.people.length
            }
          />
        </View>
      )}
    </>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    searchBoxWrapper: {
      marginHorizontal: 16,
      borderRadius: 10,
      position: 'relative',
    },
    highlightOverlay: {
      position: 'absolute',
      top: -1.5,
      left: -1.5,
      right: -1.5,
      bottom: -1.5,
      borderRadius: 11,
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    searchBoxContainer: {
      backgroundColor: colors.surfaceMuted,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchIcon: {margin: 12, color: colors.text},
    inputWrapper: {alignSelf: 'center', flex: 1},
    searchInput: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 14,
      flex: 1,
      marginRight: 12,
      color: colors.text,
    },
    clearBtn: {padding: 12},
    suggestionsContainer: {
      marginHorizontal: 16,
      marginTop: 16,
    },
    suggestionsLabel: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 13,
      color: colors.textMuted,
      marginBottom: 8,
    },
    chipsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      backgroundColor: colors.surfaceMuted,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    chipText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 13,
      color: colors.text,
    },
    resultsContainer: {
      flex: 1,
      minHeight: 0,
      marginTop: 8,
    },
  });
