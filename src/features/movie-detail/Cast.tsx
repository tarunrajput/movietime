import React, {useCallback, useEffect, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import Icon from '@expo/vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {CastCard} from './CastCard';
import {useThemeColors} from '@/lib/theme';

interface CastProps {
  castDetail?: {cast?: any[]};
}

export function Cast({castDetail}: CastProps) {
  const colors = useThemeColors();
  const cast = castDetail?.cast ?? [];
  const renderCastCard = useCallback(
    ({item, index: _index}: any) => <CastCard item={item} />,
    [],
  );

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

  const s = useMemo(() => createStyles(colors), [colors]);

  if (cast.length === 0) return null;

  return (
    <View>
      <Animated.View style={[s.header, headerStyle]}>
        <Icon
          name="person"
          size={18}
          color={colors.text}
          style={styles.iconStyle}
        />
        <Text style={s.castTitle}> Cast</Text>
      </Animated.View>
      <View style={styles.listContainer}>
        <FlashList
          keyExtractor={(item: any) => String(item.id)}
          data={cast}
          renderItem={renderCastCard}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {marginTop: 24, marginBottom: 4},
  listContainer: {height: 180},
});

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    header: {flexDirection: 'row', alignItems: 'center'},
    castTitle: {
      fontSize: 18,
      fontFamily: 'Montserrat-Bold',
      marginBottom: 4,
      marginTop: 24,
      color: colors.text,
    },
  });
