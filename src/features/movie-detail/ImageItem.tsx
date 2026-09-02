import React, {memo, useEffect} from 'react';
import {Image} from 'expo-image';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  getImageUrl,
  getPlaceholderUrl,
  pickOptimalSize,
  IMAGE_SIZES,
} from '@/lib/services/tmdb';
import {useThemeColors} from '@/lib/theme';

interface ImageItemProps {
  item: {file_path: string; aspect_ratio: number};
}

export const ImageItem = memo(function ImageItem({item}: ImageItemProps) {
  const colors = useThemeColors();
  const w = 100 * item.aspect_ratio;

  const imageOpacity = useSharedValue(0);

  useEffect(() => {
    imageOpacity.value = withTiming(1, {duration: 500});
  }, [imageOpacity]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
  }));

  return (
    <Animated.View style={fadeStyle}>
      <View
        style={[
          styles.container,
          {width: w},
          {backgroundColor: colors.gray[400]},
        ]}>
        <Image
          style={[styles.container, {width: w}]}
          source={
            getImageUrl(
              item.file_path,
              pickOptimalSize(w, IMAGE_SIZES.poster),
            ) ?? ''
          }
          placeholder={getPlaceholderUrl(item.file_path, 'poster') ?? ''}
          placeholderContentFit="cover"
          transition={500}
          contentFit="cover"
        />
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {height: 100, marginRight: 8, borderRadius: 8, overflow: 'hidden'},
});
