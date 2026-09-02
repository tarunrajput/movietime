import React, {type ReactNode} from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import {useThemeColors} from '@/lib/theme';

interface ContainerProps {
  children: ReactNode;
}

export function Container({children}: ContainerProps) {
  const colors = useThemeColors();

  if (Platform.OS === 'ios')
    return (
      <View style={[styles.container, {backgroundColor: colors.surface}]}>
        {children}
      </View>
    );
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.surface}]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
