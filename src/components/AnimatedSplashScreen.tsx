import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {Ionicons} from '@expo/vector-icons';

interface AnimatedSplashScreenProps {
  onFinish?: () => void;
}

export function AnimatedSplashScreen({onFinish}: AnimatedSplashScreenProps) {
  const breathScale = useSharedValue(1);
  const entranceOpacity = useSharedValue(0);
  const contentOffset = useSharedValue(24);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // Fade in the entire content
    entranceOpacity.value = withTiming(1, {duration: 700});
    contentOffset.value = withTiming(0, {duration: 700});

    // Icon breathing pulse — starts after entrance
    breathScale.value = withDelay(
      900,
      withRepeat(
        withSequence(
          withTiming(1.06, {duration: 1800}),
          withTiming(1, {duration: 1800}),
        ),
        -1,
        true,
      ),
    );
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [{translateY: contentOffset.value}],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: breathScale.value}],
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0B0D2E', '#15082B', '#1A0533', '#0F1123']}
        locations={[0, 0.35, 0.65, 1]}
        style={styles.gradient}>
        <Animated.View style={[styles.content, containerAnimatedStyle]}>
          {/* Glow behind icon */}
          <View style={styles.glow}>
            <View style={styles.glowInner} />
          </View>

          {/* Icon with breathing animation */}
          <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
            <View style={styles.iconWrapper}>
              <Ionicons name="film" size={64} color="#FFFFFF" />
            </View>
          </Animated.View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>MovieTime</Text>
            <View style={styles.titleUnderline} />
          </View>

          {/* Tagline */}
          <Text style={styles.tagline}>Discover Your Next Favorite Film</Text>
        </Animated.View>

        {/* Bottom branding */}
        <View style={styles.bottom}>
          <View style={styles.bottomDot} />
          <View style={[styles.bottomDot, styles.bottomDotActive]} />
          <View style={styles.bottomDot} />
        </View>

        {/* Auto-dismiss timer */}
        <TimerTrigger onFinish={onFinish} />
      </LinearGradient>
    </View>
  );
}

/** Separated into its own component so the timer doesn't affect the animated tree */
function TimerTrigger({onFinish}: {onFinish?: () => void}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(108, 92, 231, 0.2)',
    shadowColor: '#6C5CE7',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 60,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  titleUnderline: {
    width: 60,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#6C5CE7',
    marginTop: 8,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 0.8,
  },
  bottom: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  bottomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  bottomDotActive: {
    width: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
