import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../../utils/theme';
import { QUICK_PRAYERS } from '../../utils/constants';
import { useChat } from '../../hooks/useChat';

export function LibraryScreen() {
  const { send } = useChat();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    { id: 'prayers', title: 'Prayers', icon: '🙏', description: 'Traditional Catholic prayers', count: 13 },
    { id: 'sacraments', title: 'Sacraments', icon: '✝️', description: 'The seven sacred signs of grace', count: 7 },
    { id: 'catechism', title: 'Catechism', icon: '📖', description: 'Catholic teaching and doctrine', count: 10 },
    { id: 'saints', title: 'Saints', icon: '✨', description: 'Holy men and women of faith', count: 9 },
    { id: 'scripture', title: 'Scripture', icon: '📜', description: 'Bible readings and passages', count: 6 },
    { id: 'devotions', title: 'Devotions', icon: '💒', description: 'Traditional Catholic practices', count: 6 },
    { id: 'traditions', title: 'Traditions', icon: '⛪', description: 'Church history and practices', count: 3 },
    { id: 'socialTeaching', title: 'Social Teaching', icon: '🤝', description: 'Gospel values in society', count: 3 },
    { id: 'moralLife', title: 'Moral Life', icon: '⚖️', description: 'Living Christian virtues', count: 5 },
    { id: 'mary', title: 'Marian Devotion', icon: '🌹', description: 'Devotions to the Blessed Mother', count: 2 },
  ];

  const handleCategoryPress = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleBack = () => {
    setActiveCategory(null);
  };

  if (activeCategory) {
    const category = categories.find((c) => c.id === activeCategory);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{category?.icon} {category?.title}</Text>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.description}>{category?.description}</Text>
          <Text style={styles.infoText}>
            This category contains {category?.count} items. Tap on any item to learn more and pray.
          </Text>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => send(`Tell me about ${category?.title}`)}
          >
            <Text style={styles.chatButtonText}>Chat about {category?.title}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>✝️</Text>
        <Text style={styles.headerTitle}>Sacred Library</Text>
        <Text style={styles.headerSubtitle}>Explore the richness of Catholic faith</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              <Text style={styles.categoryCount}>{category.count} items</Text>
            </TouchableOpacity>
          ))}
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
  },
  backButton: {
    position: 'absolute',
    left: Spacing.lg,
  },
  backButtonText: {
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  content: {
    flex: 1,
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
  categoryCard: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  categoryTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  categoryCount: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
  },
  description: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  infoText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  chatButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#fff',
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
});
