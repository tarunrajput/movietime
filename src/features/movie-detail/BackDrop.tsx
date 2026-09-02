import React, {type ReactNode} from 'react';
import {Image} from 'expo-image';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {getBackdropUrl, getPlaceholderUrl} from '@/lib/services/tmdb';

interface BackDropProps {
  backDropPath: string | null;
  children: ReactNode;
}

export function BackDrop({backDropPath, children}: BackDropProps) {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  return (
    <View style={[styles.container, {height: windowHeight / 2.5}]}>
      <Image
        source={getBackdropUrl(backDropPath, windowWidth) ?? ''}
        placeholder={getPlaceholderUrl(backDropPath, 'backdrop') ?? ''}
        placeholderContentFit="cover"
        transition={700}
        contentFit="cover"
        style={[
          styles.imageStyle,
          {height: windowWidth * 1.7777, width: windowWidth},
        ]}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.9)']}
        locations={[0, 0.5, 1]}
        style={styles.overlay}
      />
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {flex: 1},
  container: {backgroundColor: '#000'},
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  childrenContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 16,
  },
});
