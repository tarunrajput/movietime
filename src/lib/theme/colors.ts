export const lightColors = {
  // Semantic tokens ── use these for UI roles
  background: '#FFFFFF',
  surface: '#FFFFFF',
  /** Muted fill for inputs, chips, and other raised-on-surface elements */
  surfaceMuted: '#EEEEEF',
  text: '#212529',
  // Darkened from #A1A1A4 so meta text keeps >= 4.5:1 on white surfaces
  textMuted: '#667079',
  border: '#EEEEEF',
  skeletonBase: '#DEE2E6',
  onPrimary: '#FFFFFF',
  /** Foreground over imagery/gradients, constant across themes */
  onMedia: '#FFFFFF',

  primary: '#428CD4',
  secondary: '#000957',

  gray: {
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#868E96',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  } as const,

  gold: '#F5B642',
} as const;

export const darkColors = {
  // Semantic tokens ── use these for UI roles
  background: '#000000',
  surface: '#1C1C1E',
  surfaceMuted: '#3A3A3C',
  text: '#F5F5F5',
  textMuted: '#8E8E93',
  border: '#3A3A3C',
  skeletonBase: '#48484A',
  // Brand navy on the lighter dark-theme blue: ~6.6:1 (white would wash out)
  onPrimary: '#000957',
  onMedia: '#FFFFFF',

  primary: '#5BA3E0',
  secondary: '#818CF8',

  gray: {
    50: '#1C1C1E',
    100: '#2C2C2E',
    200: '#3A3A3C',
    300: '#48484A',
    400: '#636366',
    500: '#8E8E93',
    600: '#AEAEB2',
    700: '#C7C7CC',
    800: '#D1D1D6',
    900: '#E5E5EA',
  } as const,

  gold: '#F5B642',
} as const;

export type Colors = typeof lightColors;
export type ColorKey = keyof Colors;
