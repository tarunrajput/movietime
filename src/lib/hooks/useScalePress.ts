import {useCallback} from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  type WithSpringConfig,
} from 'react-native-reanimated';

const SPRING_CONFIG: WithSpringConfig = {
  damping: 15,
  stiffness: 300,
  mass: 0.5,
};

/**
 * A hook that returns animated styles and handlers for a press-scale effect.
 *
 * Usage:
 *   const {animatedStyle, onPressIn, onPressOut} = useScalePress();
 *   <AnimatedPressable onPressIn={onPressIn} onPressOut={onPressOut} style={animatedStyle} />
 */
export function useScalePress(scaleTo: number = 0.95) {
  const scale = useSharedValue(1);

  const onPressIn = useCallback(() => {
    scale.value = withSpring(scaleTo, SPRING_CONFIG);
  }, [scale, scaleTo]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, SPRING_CONFIG);
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return {animatedStyle, onPressIn, onPressOut};
}
