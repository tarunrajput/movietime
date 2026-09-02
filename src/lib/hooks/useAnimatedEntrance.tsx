import {useEffect} from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  Easing,
  type WithTimingConfig,
} from 'react-native-reanimated';

const DEFAULT_CONFIG: WithTimingConfig = {
  duration: 400,
  easing: Easing.out(Easing.cubic),
};

/**
 * Returns an animated style for staggered entrance animations.
 * @param index - The index of the item (for stagger delay)
 * @param delayPerItem - Delay per item in ms (default 50)
 * @param baseDelay - Additional base delay in ms (default 0)
 * @param config - Timing configuration
 */
export function useAnimatedEntrance(
  index: number = 0,
  delayPerItem: number = 50,
  baseDelay: number = 0,
  config?: WithTimingConfig,
) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const cfg = config ?? DEFAULT_CONFIG;

  useEffect(() => {
    const delay = baseDelay + index * delayPerItem;
    opacity.value = withDelay(delay, withTiming(1, cfg));
    translateY.value = withDelay(delay, withTiming(0, cfg));
  }, [index, delayPerItem, baseDelay, cfg, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  return animatedStyle;
}
