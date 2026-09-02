import React, {useCallback, memo, useEffect, useMemo} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {router} from 'expo-router';
import {FlashList} from '@shopify/flash-list';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Poster} from '@/components/Poster';
import {useScalePress} from '@/lib/hooks';
import {useThemeColors} from '@/lib/theme';
import type {MediaType, Movie, TVShow} from '@/types';

interface MoviesRowProps {
  data: (Movie | TVShow)[] | undefined;
  title: string;
  icon: string;
  type: MediaType;
}

export const MoviesRow = memo(function MoviesRow({
  data,
  title,
  icon,
  type,
}: MoviesRowProps) {
  const colors = useThemeColors();
  const renderPoster = useCallback(
    ({item}: {item: Movie | TVShow}) => <Poster item={item} type={type} />,
    [type],
  );

  const {
    animatedStyle: moreBtnStyle,
    onPressIn,
    onPressOut,
  } = useScalePress(0.92);

  const titleOpacity = useSharedValue(0);
  const titleTranslateX = useSharedValue(-20);

  useEffect(() => {
    titleOpacity.value = withTiming(1, {duration: 400});
    titleTranslateX.value = withTiming(0, {duration: 400});
  }, [titleOpacity, titleTranslateX]);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{translateX: titleTranslateX.value}],
  }));

  const s = useMemo(() => createStyles(colors), [colors]);

  if (!data || data.length === 0) return null;

  return (
    <View>
      <Animated.View style={[styles.row, titleStyle]}>
        <Text style={s.text}>
          <Icon name={icon as any} size={15} />
          {` ${title}`}
        </Text>
        <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() =>
            router.push(
              `/movie-list?type=${type}&title=${encodeURIComponent(title)}` as any,
            )
          }
          hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
          accessibilityRole="button"
          accessibilityLabel={`See all ${title}`}>
          <Animated.View style={moreBtnStyle}>
            <Text style={s.textMore}>More</Text>
          </Animated.View>
        </Pressable>
      </Animated.View>
      <View style={styles.listContainer}>
        <FlashList<Movie | TVShow>
          data={data}
          horizontal
          renderItem={renderPoster}
          keyExtractor={item => String(item.id)}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  listContainer: {margin: 8, marginTop: 4, height: 188},
});

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    text: {
      fontSize: 15,
      fontFamily: 'Montserrat-SemiBold',
      marginTop: 16,
      marginBottom: 0,
      marginHorizontal: 16,
      color: colors.text,
    },
    textMore: {
      fontSize: 12,
      fontFamily: 'Montserrat-SemiBold',
      marginTop: 16,
      marginBottom: 0,
      marginHorizontal: 16,
      alignSelf: 'flex-end',
      color: colors.primary,
    },
  });
