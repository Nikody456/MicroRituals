import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { RitualCard } from '../../components/RitualCard';
import { Colors } from '../../constants/Colors';

const mockRituals = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: '5 minutes of mindfulness',
    progress: 80,
    streak: 7,
  },
  {
    id: '2',
    title: 'Reading',
    description: '10 pages before bed',
    progress: 60,
    streak: 4,
  },
  {
    id: '3',
    title: 'Exercise',
    description: 'Quick morning workout',
    progress: 40,
    streak: 3,
  },
];

export default function RitualsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {mockRituals.map(ritual => (
        <RitualCard
          key={ritual.id}
          title={ritual.title}
          description={ritual.description}
          progress={ritual.progress}
          streak={ritual.streak}
          onPress={() => console.log('Pressed ritual:', ritual.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
}); 