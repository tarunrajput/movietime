import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {SearchIcon} from '@/components/SearchIcon';
import {spacing} from '@/lib/theme';
import type {MediaType} from '@/types';

interface HomeHeaderProps {
  type: MediaType;
}

export function HomeHeader({type}: HomeHeaderProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-10);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.ease),
    });
    translateY.value = withTiming(0, {
      duration: 400,
      easing: Easing.out(Easing.ease),
    });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <View style={styles.spacer} />
      <SearchIcon type={type} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    // Minimal top gap — Container already applies status-bar inset, so a
    // large margin here just pushes the trending card below the fold.
    marginTop: 2,
    marginBottom: 2,
    marginHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  spacer: {flex: 1},
});
