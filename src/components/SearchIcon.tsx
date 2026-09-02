import React, {useCallback} from 'react';
import {Pressable} from 'react-native';
import {router} from 'expo-router';
import Icon from '@expo/vector-icons/Feather';
import Animated from 'react-native-reanimated';
import {useScalePress} from '@/lib/hooks';
import {useThemeColors} from '@/lib/theme';
import type {MediaType} from '@/types';

interface SearchIconProps {
  type: MediaType;
}

export function SearchIcon({type}: SearchIconProps) {
  const colors = useThemeColors();
  const {animatedStyle, onPressIn, onPressOut} = useScalePress(0.85);
  const handlePress = useCallback(
    () => router.push(`/search?type=${type}` as any),
    [type],
  );

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel="Search">
      <Animated.View style={animatedStyle}>
        <Icon name="search" size={20} color={colors.text} />
      </Animated.View>
    </Pressable>
  );
}
