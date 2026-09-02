import React, {useEffect, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {useThemeColors, spacing} from '@/lib/theme';
import type {MediaType} from '@/types';

interface TitleProps {
  type: MediaType;
}

export function Title({type}: TitleProps) {
  const colors = useThemeColors();
  const title = type === 'tv' ? 'TV Shows' : 'Movies';
  const titleIcon = type === 'tv' ? 'live-tv' : 'movie-filter';

  const titleOpacity = useSharedValue(0);
  const titleTranslateX = useSharedValue(-20);
  const barWidth = useSharedValue(0);

  useEffect(() => {
    titleOpacity.value = withTiming(1, {duration: 400});
    titleTranslateX.value = withTiming(0, {duration: 400});
    barWidth.value = withDelay(200, withTiming(1, {duration: 300}));
  }, [titleOpacity, titleTranslateX, barWidth]);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{translateX: titleTranslateX.value}],
  }));

  const barStyle = useAnimatedStyle(() => ({
    transform: [{scaleX: barWidth.value}],
  }));

  const s = useMemo(() => createStyles(colors), [colors]);

  return (
    <View>
      <Animated.View style={[s.titleRow, titleStyle]}>
        <Icon name={titleIcon} size={28} color={colors.text} style={s.icon} />
        <Text style={s.screenTitle}>{` ${title}`}</Text>
      </Animated.View>
      <Animated.View style={[s.separator, barStyle]} />
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    titleRow: {flexDirection: 'row', alignItems: 'center'},
    icon: {marginBottom: 0, marginTop: spacing.sm, marginLeft: spacing.lg},
    screenTitle: {
      fontSize: 30,
      fontFamily: 'Montserrat-Bold',
      marginTop: spacing.sm,
      marginBottom: 0,
      marginRight: 0,
      marginLeft: 0,
      color: colors.text,
    },
    separator: {
      backgroundColor: colors.primary,
      width: 38,
      height: 5,
      marginTop: 4,
      marginBottom: spacing.md,
      marginLeft: spacing.lg,
      transformOrigin: 'left',
    },
  });
