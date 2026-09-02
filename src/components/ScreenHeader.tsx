import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BackBtn} from './BackBtn';
import {useThemeColors} from '@/lib/theme';

interface ScreenHeaderProps {
  title: string;
}

/**
 * Shared stack-screen header: back button anchored left, title centered,
 * accent bar centered under the title text (not the screen).
 */
export function ScreenHeader({title}: ScreenHeaderProps) {
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <BackBtn style={styles.back} color={colors.text} />
      <View style={styles.titleWrap} pointerEvents="none">
        <Text style={[styles.title, {color: colors.text}]} numberOfLines={1}>
          {title}
        </Text>
        <View style={[styles.bar, {backgroundColor: colors.primary}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 12,
  },
  back: {
    position: 'absolute',
    left: 12,
    top: 0,
    zIndex: 1,
  },
  titleWrap: {
    alignItems: 'center',
    paddingHorizontal: 48,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  bar: {
    width: 40,
    height: 5,
    marginTop: 4,
    marginBottom: 12,
    borderRadius: 2,
  },
});
