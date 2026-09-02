import React, {memo, useMemo} from 'react';
import {Image} from 'expo-image';
import {View, Text, StyleSheet} from 'react-native';
import {getProfileUrl, getPlaceholderUrl} from '@/lib/services/tmdb';
import {useThemeColors} from '@/lib/theme';

interface CastCardProps {
  item: {id: number; name: string; profile_path: string | null};
}

export const CastCard = memo(function CastCard({item}: CastCardProps) {
  const colors = useThemeColors();
  const s = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={s.container}>
      <View style={[s.imageContainer, {backgroundColor: colors.gray[400]}]}>
        <Image
          style={styles.castImage}
          source={getProfileUrl(item.profile_path, 85) ?? ''}
          placeholder={getPlaceholderUrl(item.profile_path, 'profile') ?? ''}
          placeholderContentFit="cover"
          transition={500}
          contentFit="cover"
          recyclingKey={item.profile_path ?? String(item.id)}
        />
      </View>
      <Text style={[s.castName, {color: colors.text}]} numberOfLines={2}>
        {item.name}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  castImage: {width: 85, height: 150},
});

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {width: 85, marginRight: 8},
    imageContainer: {
      overflow: 'hidden',
      height: 125,
      width: 85,
      borderRadius: 8,
      backgroundColor: colors.gray[400],
    },
    castName: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 12,
      padding: 2,
      textAlign: 'center',
      marginTop: 2,
      color: colors.text,
    },
  });
