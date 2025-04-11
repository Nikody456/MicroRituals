import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { api } from '@/services/api';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function ProfileScreen() {
  const { setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await api.logout();
      setIsAuthenticated(false);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <LinearGradient
      colors={[Colors.background, Colors.backgroundLight] as [string, string]}
      style={styles.container}
    >
      <View style={styles.content}>
        <BlurView intensity={20} style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          
          <ThemedText type="title" style={styles.name}>Иван Иванов</ThemedText>
          <ThemedText style={styles.email}>ivan@example.com</ThemedText>
          
          <LinearGradient
            colors={[Colors.primary, Colors.secondary] as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <TouchableOpacity 
              onPress={handleLogout}
              style={styles.buttonTouchable}
            >
              <ThemedText style={styles.buttonText}>Выйти</ThemedText>
            </TouchableOpacity>
          </LinearGradient>
        </BlurView>
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
    alignItems: 'center',
  },
  profileCard: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary,
  },
  name: {
    fontSize: 24,
    marginBottom: 10,
    color: Colors.text,
  },
  email: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 30,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  buttonTouchable: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 