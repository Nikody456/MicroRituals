import { Stack } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function AuthLayout() {
  useAuth(); // Используем хук для проверки авторизации

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: 'Вход',
          headerShown: false,
        }}
      />
    </Stack>
  );
} 