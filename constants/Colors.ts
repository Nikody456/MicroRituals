/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  // Основные цвета
  primary: '#6366F1', // Индиго
  secondary: '#8B5CF6', // Фиолетовый
  accent: '#EC4899', // Розовый
  
  // Фон
  background: '#0F172A', // Темно-синий
  backgroundLight: '#1E293B', // Светло-синий
  backgroundGradient: ['#0F172A', '#1E293B'], // Градиент фона
  
  // Текст
  text: '#F8FAFC', // Белый
  textSecondary: '#94A3B8', // Серый
  textTertiary: '#64748B', // Темно-серый
  
  // Границы
  border: '#334155', // Темно-синий
  borderLight: '#475569', // Светло-синий
  
  // Статусы
  success: '#10B981', // Зеленый
  error: '#EF4444', // Красный
  warning: '#F59E0B', // Желтый
  info: '#3B82F6', // Синий
  
  // Градиенты
  primaryGradient: ['#6366F1', '#8B5CF6'], // Индиго -> Фиолетовый
  secondaryGradient: ['#8B5CF6', '#EC4899'], // Фиолетовый -> Розовый
  accentGradient: ['#EC4899', '#F97316'], // Розовый -> Оранжевый
  
  // Тени
  shadow: 'rgba(0, 0, 0, 0.25)',
  shadowLight: 'rgba(255, 255, 255, 0.1)',
  
  // Прозрачность
  overlay: 'rgba(15, 23, 42, 0.7)',
  
  cardBackground: '#242529',
  primaryDark: '#00B38E',
  textSecondary: '#9EA3AE',
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
