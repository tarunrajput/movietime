import React, {createContext, useContext} from 'react';
import {useColorScheme} from 'react-native';
import {lightColors, darkColors, type Colors} from './colors';

const ThemeContext = createContext<Colors>(lightColors);

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const colorScheme = useColorScheme();
  const colors = (colorScheme === 'dark' ? darkColors : lightColors) as Colors;

  return (
    <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>
  );
}

export function useThemeColors(): Colors {
  return useContext(ThemeContext);
}

export {ThemeContext};
