import React, {useCallback, useEffect, useMemo} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {router, usePathname} from 'expo-router';
import {Image} from 'expo-image';
import {FlashList} from '@shopify/flash-list';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Icon from '@expo/vector-icons/MaterialIcons';
import {getPosterUrl, getPlaceholderUrl} from '@/lib/services/tmdb';
import {useScalePress} from '@/lib/hooks';
import {useThemeColors} from '@/lib/theme';

interface RecommendationsProps {
  movieRecommendations?: {results?: any[]};
}

function RecItem({data, route}: {data: any; route: string}) {
  const colors = useThemeColors();
  const mediaType = route === '/movie/[id]' ? 'movie' : 'tv';
  const title = data.title || data.name;
  const {animatedStyle, onPressIn, onPressOut} = useScalePress(0.93);
  const s = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() =>
        router.push(
          (mediaType === 'movie'
            ? `/movie/${data.id}`
            : `/tv/${data.id}`) as any,
        )
      }>
      <Animated.View style={[styles.recItem, animatedStyle]}>
        <Image
          source={getPosterUrl(data.poster_path, 100) ?? ''}
          placeholder={getPlaceholderUrl(data.poster_path, 'poster') ?? ''}
          placeholderContentFit="cover"
          transition={500}
          style={styles.image}
          contentFit="cover"
        />
        <Text style={[s.bottomText, {color: colors.text}]} numberOfLines={2}>
          {title ?? ''}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export function Recommendations({movieRecommendations}: RecommendationsProps) {
  const colors = useThemeColors();
  const results = movieRecommendations?.results ?? [];
  const items = results.slice(0, 10);
  const route = usePathname();

  const headerOpacity = useSharedValue(0);
  const headerTranslateX = useSharedValue(-20);

  useEffect(() => {
    headerOpacity.value = withTiming(1, {duration: 400});
    headerTranslateX.value = withTiming(0, {duration: 400});
  }, [headerOpacity, headerTranslateX]);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{translateX: headerTranslateX.value}],
  }));

  const renderItem = useCallback(
    ({item}: any) => <RecItem data={item} route={route} />,
    [route],
  );

  const s = useMemo(() => createStyles(colors), [colors]);

  if (items.length === 0) return null;

  return (
    <View>
      <Animated.View style={[styles.sectionHeader, headerStyle]}>
        <Icon
          name="recommend"
          size={18}
          color={colors.text}
          style={styles.iconStyle}
        />
        <Text style={s.title}> Recommendations</Text>
      </Animated.View>
      <View style={styles.listContainer}>
        <FlashList
          data={items}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item: any) => String(item.id)}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {flexDirection: 'row', alignItems: 'center'},
  iconStyle: {marginTop: 24, marginBottom: 4},
  image: {height: 150, width: 100, borderRadius: 10},
  recItem: {marginRight: 8, width: 100},
  listContainer: {height: 180},
});

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    title: {
      fontSize: 18,
      fontFamily: 'Montserrat-Bold',
      marginBottom: 4,
      marginTop: 24,
      color: colors.text,
    },
    bottomText: {
      marginTop: 4,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 12,
      textAlign: 'center',
      width: 100,
    },
  });
