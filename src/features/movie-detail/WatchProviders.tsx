import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image} from 'expo-image';
import {getLocales} from 'expo-localization';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {getLogoUrl, getPlaceholderUrl} from '@/lib/services/tmdb';
import {useThemeColors} from '@/lib/theme';
import Icon from '@expo/vector-icons/Octicons';

interface WatchProvidersProps {
  providers?: {results?: Record<string, any>};
}

export function WatchProviders({providers}: WatchProvidersProps) {
  const colors = useThemeColors();
  const results = providers?.results ?? {};
  const country = getLocales()[0]?.regionCode ?? 'IN';
  const current = results[country] ?? {};
  const items = [...(current.flatrate ?? []), ...(current.rent ?? [])].slice(
    0,
    6,
  );

  const s = useMemo(() => createStyles(colors), [colors]);

  if (items.length === 0) return null;

  return (
    <View>
      <Text style={s.title}>
        <Icon name="broadcast" size={18} /> Available On
      </Text>
      <View style={styles.row}>
        {items.map((item: any, index: number) => (
          <ProviderLogo key={item.provider_id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
}

function ProviderLogo({item, index}: {item: any; index: number}) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(index * 80, withTiming(1, {duration: 300}));
    scale.value = withDelay(index * 80, withTiming(1, {duration: 300}));
  }, [index, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={[styles.logoWrapper, animatedStyle]}>
      <Image
        style={[styles.providerLogo, {aspectRatio}]}
        source={getLogoUrl(item.logo_path, 185) ?? ''}
        contentFit="contain"
        placeholder={getPlaceholderUrl(item.logo_path, 'logo') ?? ''}
        placeholderContentFit="contain"
        transition={300}
        onLoad={e => setAspectRatio(e.source.width / e.source.height)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', flexWrap: 'wrap', gap: 16},
  logoWrapper: {alignSelf: 'flex-start'},
  providerLogo: {height: 32, borderRadius: 8},
});

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    title: {
      fontSize: 18,
      fontFamily: 'Montserrat-Bold',
      marginBottom: 8,
      marginTop: 24,
      color: colors.text,
    },
  });
