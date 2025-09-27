import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Ionicons name="restaurant" size={60} color="#00BFFF" />
        <Text style={styles.title}>Delicious Recipes</Text>
        <Text style={styles.subtitle}>By Vincent Hermoso</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This App</Text>
          <Text style={styles.sectionText}>
            Delicious Recipes is a comprehensive cooking app designed to help you discover 
            and create amazing dishes from around the world. Whether you're a beginner cook 
            or an experienced chef, this app provides detailed recipes with step-by-step 
            instructions to guide you through the cooking process.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developer Info</Text>
          <Text style={styles.sectionText}>
            This app was developed by Vincent Hermoso, a poging BSIT student
            and cooking enthusiast. The goal was to create an intuitive and beautiful 
            recipe app that makes cooking accessible to everyone. The contents of this appp is very limited for now.
          </Text>
          
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>Delicious</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    color: '#00BFFF',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FF69B4',
    marginTop: 5,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#8A2BE2',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionText: {
    color: '#FF69B4',
    fontSize: 16,
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    marginRight: 15,
  },
  featureTitle: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  featureDesc: {
    color: '#FF69B4',
    fontSize: 14,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    color: '#00BFFF',
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#FF69B4',
    fontSize: 14,
    marginTop: 5,
  },
  technologySection: {
    marginBottom: 30,
  },
  techList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  techItem: {
    alignItems: 'center',
  },
  techText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
  },
});