import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AccessibilityInfo, StyleSheet} from 'react-native';
import type {ComponentRef} from 'react';
import {Carousel} from 'react-native-reanimated-carousel';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {SwipeCard} from './SwipeCard';
import type {MediaType, Movie, TVShow} from '@/types';

const RESUME_DELAY_MS = 4000;

interface TrendingCarouselProps {
  data: (Movie | TVShow)[];
  type: MediaType;
}

export function TrendingCarousel({data, type}: TrendingCarouselProps) {
  const carouselRef = useRef<ComponentRef<typeof Carousel> | null>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [userInteracting, setUserInteracting] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carouselOpacity = useSharedValue(0);
  const carouselScale = useSharedValue(0.95);

  // Animate on mount only — this component only renders when data is available,
  // so there's no need to watch props/state in the effect.
  useEffect(() => {
    carouselOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
    carouselScale.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
  }, [carouselOpacity, carouselScale]);

  // Respect the OS reduce-motion setting: autoplaying is motion.
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled()
      .then(reduced => setMotionAllowed(!reduced))
      .catch(() => setMotionAllowed(true));
    const sub = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      reduced => setMotionAllowed(!reduced),
    );
    return () => sub.remove();
  }, []);

  // Pause while the user is touching the carousel, resume shortly after so
  // cards don't advance mid-read or under an in-progress tap.
  const pauseAutoplay = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setUserInteracting(true);
  }, []);

  const resumeAutoplay = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(
      () => setUserInteracting(false),
      RESUME_DELAY_MS,
    );
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const carouselStyle = useAnimatedStyle(() => ({
    opacity: carouselOpacity.value,
    transform: [{scale: carouselScale.value}],
  }));

  return (
    <Animated.View
      style={carouselStyle}
      onTouchStart={pauseAutoplay}
      onTouchEnd={resumeAutoplay}>
      <Carousel
        ref={carouselRef}
        style={styles.carousel}
        loop
        autoplay={motionAllowed && !userInteracting}
        autoplayInterval={3000}
        animation={{type: 'timing', duration: 600}}
        data={data}
        renderItem={({item}) => <SwipeCard type={type} info={item} />}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  carousel: {width: '100%', height: 255},
});
