import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function TextScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.brandTitle}>💜 AI'm yours</Text>
            <Text style={styles.subtitle}>Flirt awake. Snore asleep. Win always</Text>
          </View>
    
          {/* Navigation Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={styles.tab}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.tabIcon}>📷</Text>
              <Text style={styles.tabText}>Mood detector</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.tab}
              onPress={() => navigation.navigate('Text')}
            >
              <Text style={styles.tabIcon}>📚</Text>
              <Text style={styles.tabText}>Pick-up line of day</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={styles.tabIcon}>💬</Text>
              <Text style={[styles.tabText, styles.activeTabText]}>Cringe-ometre</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.tab}
              onPress={() => navigation.navigate('Upload')}
            >
              <Text style={styles.tabIcon}>👔</Text>
              <Text style={styles.tabText}>Outfit of the Date</Text>
            </TouchableOpacity>
          </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.mainTitle}>👋 L'Art du Premier Contact</Text>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💎</Text>
            <Text style={styles.sectionTitle}>Le pouvoir du sourire</Text>
          </View>

          <Text style={styles.description}>
            Un sourire sincère est ton meilleur atout. Il transmet immédiatement de la chaleur et de 
            l'ouverture. Pratique ton sourire naturel devant un miroir.
          </Text>

          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Conseils pratiques :</Text>
            
            <View style={styles.tipItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.tipText}>Souris avec tes yeux, pas seulement ta bouche</Text>
            </View>
            
            <View style={styles.tipItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.tipText}>Un sourire discret vaut mieux qu'un sourire forcé</Text>
            </View>
            
            <View style={styles.tipItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.tipText}>Le timing est important : souris quand tu croises son regard</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💎</Text>
            <Text style={styles.sectionTitle}>L'approche naturelle</Text>
          </View>

          <Text style={styles.description}>
            La meilleure approche est celle qui paraît naturelle et spontanée. Évite les phrases toutes 
            faites et mise sur l'authenticité.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#10b981',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  tabText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  mainContent: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 20,
  },
  tipsContainer: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    color: '#059669',
    marginRight: 10,
    marginTop: 2,
  },
  tipText: {
    fontSize: 14,
    color: '#065f46',
    flex: 1,
    lineHeight: 20,
  },
});