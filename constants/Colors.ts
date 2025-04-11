/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  background: '#1A1B1E',
  cardBackground: '#242529',
  primary: '#00E6B5',
  primaryDark: '#00B38E',
  text: '#FFFFFF',
  textSecondary: '#9EA3AE',
  success: '#00E6B5',
  error: '#FF4D4D',
  warning: '#FFB800',
  overlay: 'rgba(0, 0, 0, 0.5)',
  border: '#2F3136',
  inactive: '#4A4D56',
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
