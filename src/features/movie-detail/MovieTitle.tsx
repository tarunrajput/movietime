import React, {useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {useThemeColors} from '@/lib/theme';

interface MovieTitleProps {
  title: string;
}

export function MovieTitle({title}: MovieTitleProps) {
  const colors = useThemeColors();
  const titleOpacity = useSharedValue(0);
  const titleTranslateX = useSharedValue(-20);
  const barWidth = useSharedValue(0);

  useEffect(() => {
    titleOpacity.value = withTiming(1, {duration: 400});
    titleTranslateX.value = withTiming(0, {duration: 400});
    barWidth.value = withDelay(200, withTiming(1, {duration: 300}));
  }, [titleOpacity, titleTranslateX, barWidth]);

  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{translateX: titleTranslateX.value}],
  }));

  const barStyle = useAnimatedStyle(() => ({
    transform: [{scaleX: barWidth.value}],
  }));

  const s = useMemo(() => createStyles(colors), [colors]);

  return (
    <View>
      <Animated.Text style={[s.title, animatedTitleStyle]}>
        {title}
      </Animated.Text>
      <Animated.View style={[s.separator, barStyle]} />
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    title: {fontFamily: 'Montserrat-Bold', fontSize: 24, color: colors.onMedia},
    separator: {
      width: 30,
      height: 5,
      backgroundColor: colors.primary,
      marginTop: 4,
      marginBottom: 8,
      transformOrigin: 'left',
    },
  });
