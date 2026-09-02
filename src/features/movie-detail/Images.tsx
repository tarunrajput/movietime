import React, {useCallback, useEffect, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Icon from '@expo/vector-icons/Entypo';
import {ImageItem} from './ImageItem';
import {useThemeColors} from '@/lib/theme';

interface MovieImagesProps {
  movieImages?: {backdrops?: any[]};
}

export function MovieImages({movieImages}: MovieImagesProps) {
  const colors = useThemeColors();
  const backdrops = movieImages?.backdrops ?? [];

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

  const renderImageItem = useCallback(
    ({item}: any) => <ImageItem item={item} />,
    [],
  );

  const s = useMemo(() => createStyles(colors), [colors]);

  if (backdrops.length === 0) return null;

  return (
    <View>
      <Animated.View style={headerStyle}>
        <Text style={s.title}>
          <Icon name="images" size={18} /> Images
        </Text>
      </Animated.View>
      <View style={styles.listContainer}>
        <FlashList
          keyExtractor={(item: any) => item.file_path}
          data={backdrops}
          renderItem={renderImageItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {height: 110},
});

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    title: {
      fontSize: 18,
      fontFamily: 'Montserrat-Bold',
      marginBottom: 4,
      marginTop: 4,
      color: colors.text,
    },
  });
