import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { api } from '../../services/api';
import { Colors } from '../../constants/Colors';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !username)) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    try {
      setIsLoading(true);
      if (isLogin) {
        await api.login({ email, password });
        setIsAuthenticated(true);
      } else {
        await api.register({ email, password, username });
        await api.login({ email, password });
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      Alert.alert('Ошибка', error?.message || 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[Colors.background, Colors.backgroundLight] as [string, string]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{isLogin ? 'Добро пожаловать' : 'Создать аккаунт'}</Text>
        <Text style={styles.subtitle}>
          {isLogin ? 'Войдите в свой аккаунт' : 'Зарегистрируйтесь, чтобы начать'}
        </Text>

        <BlurView intensity={20} style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={Colors.textSecondary}
            editable={!isLoading}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={Colors.textSecondary}
            editable={!isLoading}
          />
          
          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Имя пользователя"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={Colors.textSecondary}
              editable={!isLoading}
            />
          )}
          
          <LinearGradient
            colors={[Colors.primary, Colors.secondary] as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.button, isLoading && styles.buttonDisabled]}
          >
            <TouchableOpacity 
              onPress={handleSubmit}
              disabled={isLoading}
              style={styles.buttonTouchable}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </BlurView>

        <TouchableOpacity 
          style={styles.switchButton} 
          onPress={() => setIsLogin(!isLogin)}
          disabled={isLoading}
        >
          <Text style={styles.switchButtonText}>
            {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    backgroundColor: Colors.overlay,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    color: Colors.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonTouchable: {
    padding: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
}); 