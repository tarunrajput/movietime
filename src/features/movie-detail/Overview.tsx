import React, {useState, useCallback, useMemo} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {useThemeColors} from '@/lib/theme';

interface OverviewProps {
  overview: string;
}

export function Overview({overview}: OverviewProps) {
  const colors = useThemeColors();
  const [isExpanded, setIsExpanded] = useState(false);
  const rotation = useSharedValue(0);

  const toggleExpand = useCallback(() => {
    rotation.value = withSpring(isExpanded ? 0 : 180, {
      damping: 15,
      stiffness: 150,
    });
    setIsExpanded(prev => !prev);
  }, [rotation, isExpanded]);

  const animatedArrow = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  const s = useMemo(() => createStyles(colors), [colors]);

  if (!overview) return null;

  return (
    <View>
      <Text style={s.title}>
        <Icon name="text" size={18} /> Plot Summary
      </Text>
      <Pressable onPress={toggleExpand}>
        <View style={s.overviewRow}>
          <Animated.View style={animatedArrow}>
            <Icon name="chevron-down" size={16} color={colors.gray[600]} />
          </Animated.View>
          <Text style={s.overviewLabel}>
            Tap to {isExpanded ? 'collapse' : 'read more'}
          </Text>
        </View>
        <Text numberOfLines={isExpanded ? undefined : 3} style={s.text}>
          {overview}
        </Text>
      </Pressable>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    title: {
      fontSize: 18,
      fontFamily: 'Montserrat-Bold',
      marginBottom: 4,
      marginTop: 24,
      color: colors.text,
    },
    text: {fontSize: 14, fontFamily: 'Montserrat-Regular', color: colors.text},
    overviewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
      gap: 4,
    },
    overviewLabel: {
      fontSize: 12,
      fontFamily: 'Montserrat-Medium',
      color: colors.gray[600],
    },
  });
