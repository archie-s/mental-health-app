import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  isUnlocked: boolean;
  progress: number;
}

export const AchievementSystem = () => {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Mindfulness Master',
      description: 'Complete 10 meditation sessions',
      points: 100,
      isUnlocked: false,
      progress: 0,
    },
    {
      id: '2',
      title: 'Journal Journey',
      description: 'Write in your journal for 7 consecutive days',
      points: 150,
      isUnlocked: false,
      progress: 0,
    },
  ];

  const renderAchievement = ({ item }: { item: Achievement }) => (
    <View style={styles.achievementCard}>
      <Text style={[styles.title, { color: item.isUnlocked ? theme.colors.success : theme.colors.text }]}>
        {item.title}
      </Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${Math.min(Math.max(item.progress ?? 0, 0), 100)}%` }]} />
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.points}>{item.points} Points</Text>
        <Text style={[styles.status, { color: item.isUnlocked ? theme.colors.success : theme.colors.text, fontWeight: item.isUnlocked ? 'bold' : 'normal' }]}>
          {item.isUnlocked ? 'Unlocked!' : `${item.progress}% Complete`}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={achievements}
        renderItem={renderAchievement}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        initialNumToRender={5} // ✅ Performance improvement
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background ?? '#fff', // ✅ Default fallback
  },
  listContainer: {
    padding: theme.spacing?.md ?? 16, // ✅ Default fallback
  },
  achievementCard: {
    backgroundColor: theme.colors?.surface ?? '#eee', // ✅ Default fallback
    padding: theme.spacing?.md ?? 16,
    borderRadius: theme.borderRadius?.md ?? 8, // ✅ Default fallback
    marginBottom: theme.spacing?.md ?? 16,
    elevation: 2,
  },
  title: {
    fontSize: 18, // ✅ Replaces theme.typography.h3 if missing
    fontWeight: 'bold',
    color: theme.colors?.text ?? '#000',
    marginBottom: theme.spacing?.xs ?? 8,
  },
  description: {
    fontSize: 14, // ✅ Replaces theme.typography.body1 if missing
    color: theme.colors?.text ?? '#000',
    marginBottom: theme.spacing?.sm ?? 12,
  },
  progressContainer: {
    height: 8,
    backgroundColor: theme.colors?.disabled ?? '#ccc',
    borderRadius: theme.borderRadius?.sm ?? 4,
    overflow: 'hidden',
    marginBottom: theme.spacing?.xs ?? 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors?.primary ?? '#007AFF',
  },
  points: {
    fontSize: 14, // ✅ Replaces theme.typography.body2 if missing
    fontWeight: 'bold',
    color: theme.colors?.primary ?? '#007AFF',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing?.xs ?? 8,
  },
  status: {
    fontSize: 14, // ✅ Replaces theme.typography.body2 if missing
    color: theme.colors?.text ?? '#000',
    fontWeight: 'normal',
  },
});

export default AchievementSystem;
