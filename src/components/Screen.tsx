import React, {type ReactNode} from 'react';
import {View, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {Container} from './Container';
import {useThemeColors} from '@/lib/theme';

interface ScreenProps {
  children: ReactNode;
}

export function Screen({children}: ScreenProps) {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.screen, {backgroundColor: colors.surface}]}>
      <Container>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          translucent
        />
        {children}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
});
