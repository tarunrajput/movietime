import React, {useCallback} from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import {View, Pressable, type ViewStyle, type StyleProp} from 'react-native';
import {router} from 'expo-router';
import {useScalePress} from '@/lib/hooks';
import Animated from 'react-native-reanimated';

interface BackBtnProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
}

export function BackBtn({style, color = '#fff'}: BackBtnProps) {
  const {animatedStyle, onPressIn, onPressOut} = useScalePress(0.85);
  const handleBack = useCallback(() => router.back(), []);

  return (
    <View style={style}>
      <Pressable
        onPress={handleBack}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        hitSlop={8}>
        <Animated.View style={animatedStyle}>
          <Icon name="arrow-back-ios" size={30} style={{color}} />
        </Animated.View>
      </Pressable>
    </View>
  );
}
