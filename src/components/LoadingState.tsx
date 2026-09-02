import React, {useEffect} from 'react';
import {View, StyleSheet, type ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useThemeColors, spacing} from '@/lib/theme';

// ─── Animated Skeleton Base ──────────────────────────────────────────────────

interface SkeletonBoxProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  bgColor?: string;
}

const SkeletonBox = React.memo(function SkeletonBox({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
  bgColor,
}: SkeletonBoxProps) {
  const {skeletonBase} = useThemeColors();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 800}),
        withTiming(0.3, {duration: 800}),
      ),
      -1,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: bgColor ?? skeletonBase,
        },
        style,
      ]}
    />
  );
});

// ─── Home Screen Skeletons ──────────────────────────────────────────────────

function HomeTrendingSkeleton() {
  const colors = useThemeColors();
  return (
    <View style={styles.homeTrending}>
      <SkeletonBox
        width="100%"
        height={255}
        borderRadius={8}
        bgColor={colors.gray[300]}
      />
    </View>
  );
}

function MoviesRowSkeleton() {
  const colors = useThemeColors();
  return (
    <View style={styles.mt8}>
      <View style={styles.moviesRowTitle}>
        <SkeletonBox
          width={120}
          height={18}
          borderRadius={4}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width={40}
          height={14}
          borderRadius={4}
          bgColor={colors.gray[300]}
        />
      </View>
      <View style={styles.moviesRowPosters}>
        {[1, 2, 3, 4].map(i => (
          <SkeletonBox
            key={i}
            width={120}
            height={180}
            borderRadius={8}
            style={styles.mr8}
            bgColor={colors.gray[300]}
          />
        ))}
      </View>
    </View>
  );
}

/** Full home screen skeleton */
export function HomeSkeleton() {
  const colors = useThemeColors();
  return (
    <View style={[styles.flex1, {backgroundColor: colors.surface}]}>
      <View style={styles.homeHeaderSkeleton}>
        <SkeletonBox
          width={24}
          height={24}
          borderRadius={12}
          style={styles.alignEnd}
          bgColor={colors.gray[300]}
        />
      </View>
      <View style={styles.homeTitleSkeleton}>
        <SkeletonBox
          width={140}
          height={30}
          borderRadius={4}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width={38}
          height={5}
          borderRadius={2}
          style={styles.mt5}
          bgColor={colors.gray[300]}
        />
      </View>
      <HomeTrendingSkeleton />
      {[1, 2, 3, 4].map(i => (
        <MoviesRowSkeleton key={i} />
      ))}
    </View>
  );
}

// ─── Movie Detail Skeletons ─────────────────────────────────────────────────

function MovieDetailBackdropSkeleton() {
  const colors = useThemeColors();
  return (
    <View style={styles.backdropSkeleton}>
      <SkeletonBox width="100%" height={300} bgColor={colors.gray[300]} />
      <View style={styles.backdropContentSkeleton}>
        <SkeletonBox
          width="70%"
          height={24}
          borderRadius={4}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width={30}
          height={5}
          borderRadius={2}
          style={styles.mt4}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width="40%"
          height={16}
          borderRadius={4}
          style={styles.mt8}
          bgColor={colors.gray[300]}
        />
      </View>
    </View>
  );
}

function MovieDetailInfoSkeleton() {
  const colors = useThemeColors();
  return (
    <View style={styles.detailInfoSkeleton}>
      <View style={styles.genresSkeleton}>
        {[1, 2, 3].map(i => (
          <SkeletonBox
            key={i}
            width={70}
            height={26}
            borderRadius={4}
            style={styles.mr8}
            bgColor={colors.gray[300]}
          />
        ))}
      </View>
      <View style={styles.mt24}>
        <SkeletonBox
          width={140}
          height={18}
          borderRadius={4}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width="100%"
          height={14}
          borderRadius={4}
          style={styles.mt8}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width="95%"
          height={14}
          borderRadius={4}
          style={styles.mt4}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width="60%"
          height={14}
          borderRadius={4}
          style={styles.mt4}
          bgColor={colors.gray[300]}
        />
      </View>
      <View style={styles.mt24}>
        <SkeletonBox
          width={80}
          height={18}
          borderRadius={4}
          bgColor={colors.gray[300]}
        />
        <View style={styles.castRowSkeleton}>
          {[1, 2, 3, 4].map(i => (
            <View key={i} style={styles.mr8}>
              <SkeletonBox
                width={85}
                height={125}
                borderRadius={8}
                bgColor={colors.gray[300]}
              />
              <SkeletonBox
                width={85}
                height={12}
                borderRadius={4}
                style={styles.mt4}
                bgColor={colors.gray[300]}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.mt24}>
        <SkeletonBox
          width={100}
          height={18}
          borderRadius={4}
          bgColor={colors.gray[300]}
        />
        <View style={styles.castRowSkeleton}>
          {[1, 2, 3].map(i => (
            <SkeletonBox
              key={i}
              width={150}
              height={100}
              borderRadius={8}
              style={styles.mr8}
              bgColor={colors.gray[300]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

/** Full movie detail page skeleton */
export function MovieDetailSkeleton() {
  return (
    <View style={styles.flex1}>
      <MovieDetailBackdropSkeleton />
      <MovieDetailInfoSkeleton />
    </View>
  );
}

// ─── Movie List / Search Result Skeletons ────────────────────────────────────

/** Skeleton for a single search result row */
export function SearchResultSkeleton() {
  const colors = useThemeColors();
  return (
    <View style={styles.searchResultSkeleton}>
      <SkeletonBox
        width={80}
        height={110}
        borderRadius={8}
        bgColor={colors.gray[300]}
      />
      <View style={styles.searchResultContent}>
        <SkeletonBox
          width="80%"
          height={16}
          borderRadius={4}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width="50%"
          height={12}
          borderRadius={4}
          style={styles.mt8}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width="60%"
          height={14}
          borderRadius={4}
          style={styles.mt12}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width="90%"
          height={12}
          borderRadius={4}
          style={styles.mt6}
          bgColor={colors.gray[300]}
        />
      </View>
    </View>
  );
}

/** Full movie list screen skeleton with header */
export function MovieListSkeleton() {
  const colors = useThemeColors();
  return (
    <View style={styles.movieListContainer}>
      <View style={styles.movieListHeader}>
        <SkeletonBox
          width={30}
          height={30}
          borderRadius={4}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width={180}
          height={20}
          borderRadius={4}
          bgColor={colors.gray[300]}
        />
        <SkeletonBox
          width={30}
          height={30}
          borderRadius={4}
          bgColor={colors.gray[300]}
        />
      </View>
      <SkeletonBox
        width={40}
        height={5}
        borderRadius={2}
        style={styles.listTitleBar}
        bgColor={colors.gray[300]}
      />
      {[1, 2, 3, 4, 5].map(i => (
        <SearchResultSkeleton key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {flex: 1},
  alignEnd: {alignSelf: 'flex-end'},
  mt4: {marginTop: 4},
  mt5: {marginTop: 4},
  mt6: {marginTop: 6},
  mt8: {marginTop: 8},
  mt12: {marginTop: 12},
  mt24: {marginTop: 24},
  mr8: {marginRight: 8},

  // Home skeletons
  homeHeaderSkeleton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: spacing.lg,
  },
  homeTitleSkeleton: {marginLeft: spacing.lg, marginBottom: 12},
  homeTrending: {marginHorizontal: 12, marginBottom: 16},
  moviesRowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  moviesRowPosters: {flexDirection: 'row', marginLeft: 12},

  // Detail skeletons
  backdropSkeleton: {height: 300, position: 'relative'},
  backdropContentSkeleton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  detailInfoSkeleton: {padding: 16, paddingTop: 24},
  genresSkeleton: {flexDirection: 'row', flexWrap: 'wrap'},
  castRowSkeleton: {flexDirection: 'row', marginTop: 8},

  // Search/List skeletons
  searchResultSkeleton: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginVertical: 8,
  },
  searchResultContent: {flex: 1, marginLeft: 16, paddingTop: 4},
  movieListContainer: {flex: 1, padding: 16},
  movieListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listTitleBar: {alignSelf: 'center', marginBottom: 16},
});
