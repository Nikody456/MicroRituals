import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { Card } from '../../components/Card';
import { CircularProgress } from '../../components/CircularProgress';
import { Colors } from '../../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { RitualCard } from '../../components/RitualCard';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

interface Profile {
  username: string;
  score: number;
  achievements: string[];
}

interface Ritual {
  id: string;
  title: string;
  description: string;
  progress: number;
  streak: number;
}

export default function HomeScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isAuthenticated } = useAuth();

  const loadData = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      const [ritualsData, profileData] = await Promise.all([
        api.getRituals(),
        api.getProfile(),
      ]);
      setRituals(ritualsData);
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {profile && (
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <FontAwesome5 name="user-circle" size={40} color={Colors.primary} />
            <View style={styles.profileInfo}>
              <Text style={styles.username}>{profile.username}</Text>
              <Text style={styles.score}>{profile.score} очков</Text>
            </View>
          </View>
          <View style={styles.achievements}>
            {profile.achievements.map((achievement, index) => (
              <Text key={index} style={styles.achievement}>
                {achievement}
              </Text>
            ))}
          </View>
        </Card>
      )}

      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Сегодняшний прогресс</Text>
        <CircularProgress
          size={120}
          strokeWidth={10}
          progress={75}
          value="75%"
          label="выполнено"
        />
      </View>

      <View style={styles.ritualsSection}>
        <Text style={styles.sectionTitle}>Сегодняшние ритуалы</Text>
        {rituals.map((ritual) => (
          <RitualCard
            key={ritual.id}
            title={ritual.title}
            description={ritual.description}
            progress={ritual.progress}
            streak={ritual.streak}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    color: Colors.text,
    fontSize: 16,
  },
  profileCard: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileInfo: {
    marginLeft: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  score: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  achievements: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  achievement: {
    backgroundColor: Colors.primary,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  ritualsSection: {
    marginBottom: 20,
  },
});
