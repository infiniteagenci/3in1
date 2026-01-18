import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../../utils/theme';
import { QUICK_PRAYERS } from '../../utils/constants';
import { useChat } from '../../hooks/useChat';

export function PrayersScreen() {
  const { send } = useChat();

  const handlePrayerPress = (prayerId: string) => {
    const prayer = QUICK_PRAYERS.find((p) => p.id === prayerId);
    if (prayer) {
      send(prayer.title);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🙏</Text>
          <Text style={styles.headerTitle}>Prayers</Text>
          <Text style={styles.headerSubtitle}>
            Quick access to spiritual practices
          </Text>
        </View>

        {/* Quick Prayers Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Prayers</Text>
          <View style={styles.grid}>
            {QUICK_PRAYERS.map((prayer) => (
              <TouchableOpacity
                key={prayer.id}
                style={styles.prayerCard}
                onPress={() => handlePrayerPress(prayer.id)}
              >
                <Text style={styles.prayerIcon}>{prayer.icon}</Text>
                <Text style={styles.prayerTitle}>{prayer.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Prayer Progress Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Prayer Consistency</Text>
              <Text style={styles.progressValue}>75%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
            <View style={styles.progressStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>7</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>23</Text>
                <Text style={styles.statLabel}>Total Days</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Active Novenas Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Novenas</Text>
          <View style={styles.novenaCard}>
            <Text style={styles.novenaText}>No active novenas</Text>
            <Text style={styles.novenaSubtext}>
              Start a 9-day prayer journey for a special intention
            </Text>
            <TouchableOpacity
              style={styles.startNovenaButton}
              onPress={() => send('I want to start a novena')}
            >
              <Text style={styles.startNovenaButtonText}>Start Novena</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  prayerCard: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  prayerIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  prayerTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text,
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  progressTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
  },
  progressValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  novenaCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  novenaText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  novenaSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  startNovenaButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  startNovenaButtonText: {
    color: '#fff',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
});
