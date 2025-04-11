import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Card } from '../../components/Card';
import { Colors } from '../../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { api } from '../../services/api';
import { router } from 'expo-router';

const frequencies = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekdays', label: 'Weekdays' },
  { id: 'weekends', label: 'Weekends' },
  { id: 'custom', label: 'Custom' },
];

export default function AddRitualScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('daily');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your ritual');
      return;
    }

    setIsLoading(true);
    try {
      await api.createRitual({
        title: title.trim(),
        description: description.trim(),
        frequency: selectedFrequency,
      });
      
      Alert.alert('Success', 'Ritual created successfully', [
        { text: 'OK', onPress: () => router.push('/') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create ritual. Please try again.');
      console.error('Create ritual error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Create New Ritual</Text>
      
      <Card style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Morning Meditation"
          placeholderTextColor={Colors.textSecondary}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="What do you want to achieve?"
          placeholderTextColor={Colors.textSecondary}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Frequency</Text>
        <View style={styles.frequencyGrid}>
          {frequencies.map(freq => (
            <TouchableOpacity
              key={freq.id}
              style={[
                styles.frequencyOption,
                selectedFrequency === freq.id && styles.selectedFrequency,
              ]}
              onPress={() => setSelectedFrequency(freq.id)}>
              <Text
                style={[
                  styles.frequencyText,
                  selectedFrequency === freq.id && styles.selectedFrequencyText,
                ]}>
                {freq.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <TouchableOpacity 
        style={[styles.createButton, isLoading && styles.createButtonDisabled]} 
        onPress={handleCreate}
        disabled={isLoading}>
        {isLoading ? (
          <Text style={styles.createButtonText}>Creating...</Text>
        ) : (
          <>
            <FontAwesome5 name="plus" size={16} color={Colors.text} />
            <Text style={styles.createButtonText}>Create Ritual</Text>
          </>
        )}
      </TouchableOpacity>
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
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    marginBottom: 24,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    color: Colors.text,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  frequencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  frequencyOption: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    minWidth: '48%',
    alignItems: 'center',
  },
  selectedFrequency: {
    backgroundColor: Colors.primary,
  },
  frequencyText: {
    color: Colors.text,
    fontSize: 16,
  },
  selectedFrequencyText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButtonDisabled: {
    opacity: 0.7,
  },
}); 