import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateModeEnabled, setPrivateModeEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log out', 
          style: 'destructive',
          onPress: () => navigation.replace('Login')
        }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Edit Profile',
      'Wala pa po hnd pa pwede',
      [{ text: 'OK' }]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      'Help & FAQ',
      'Need help? ako rin. pm mo ako sa ig',
      [{ text: 'OK' }]
    );
  };

  const handleRateApp = () => {
    Alert.alert(
      'Rate the App',
      'Salamat sa suporta makukuba na ako kaka-trial & error dito.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={80} color="#00BFFF" />
        <Text style={styles.title}>Binsent Pogi</Text>
        <Text style={styles.subtitle}>Manage your account </Text>
      </View>

      <View style={styles.content}>
        {/* Profile Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <View style={styles.profileInfo}>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={20} color="#FF69B4" />
              <Text style={styles.infoLabel}>Username:</Text>
              <Text style={styles.infoValue}>user</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="mail" size={20} color="#FF69B4" />
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>binsentpogi@gmail.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={20} color="#FF69B4" />
              <Text style={styles.infoLabel}>Joined:</Text>
              <Text style={styles.infoValue}>September 2025</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
            <Ionicons name="pencil" size={16} color="white" />
          </TouchableOpacity>
        </View>


        {/* Account & Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Support</Text>
          
          <TouchableOpacity style={styles.supportButton} onPress={handleHelp}>
            <Ionicons name="help-circle" size={20} color="#00BFFF" />
            <Text style={styles.supportText}>Help & FAQ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportButton} onPress={handleRateApp}>
            <Ionicons name="star" size={20} color="#FF69B4" />
            <Text style={styles.supportText}>Rate the App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={24} color="#FF69B4" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
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
    fontSize: 28,
    color: '#00BFFF',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FF69B4',
    marginTop: 5,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#8A2BE2',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionSubtitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 15,
  },
  profileInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  infoValue: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A2BE2',
    padding: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  supportText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 105, 180, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF69B4',
    marginTop: 10,
  },
  logoutText: {
    color: '#FF69B4',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
