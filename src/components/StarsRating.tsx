import React, {useEffect} from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface StarsRatingProps {
  rating: number;
  starSize?: number;
  color?: string;
  emptyColor?: string;
}

export function StarsRating({
  rating,
  starSize = 15,
  color = '#F5B642',
  emptyColor = '#fff',
}: StarsRatingProps) {
  const fillWidth = useSharedValue(0);
  const starGap = 4;
  const totalWidth = starSize * 5 + starGap * 4;
  const targetWidth = (Math.min(rating, 10) / 10) * totalWidth;

  useEffect(() => {
    fillWidth.value = withSpring(targetWidth, {
      damping: 15,
      stiffness: 120,
      mass: 0.5,
    });
  }, [targetWidth, fillWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: fillWidth.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.emptyStars}>
        {[0, 1, 2, 3, 4].map(i => (
          <Icon key={`e-${i}`} name="star" size={starSize} color={emptyColor} />
        ))}
      </View>
      <Animated.View style={[styles.filledStars, animatedStyle]}>
        {[0, 1, 2, 3, 4].map(i => (
          <Icon key={`f-${i}`} name="star" size={starSize} color={color} />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {position: 'relative', flexDirection: 'row'},
  emptyStars: {flexDirection: 'row', gap: 4},
  filledStars: {
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
    flexDirection: 'row',
    gap: 4,
  },
});
