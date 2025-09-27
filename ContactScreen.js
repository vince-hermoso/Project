import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert('Message Sent', 'Thank you for your message! We\'ll get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  const openEmail = () => {
    Linking.openURL('mailto:vincenthermoso90@gmail.com');
  };

  const openPhone = () => {
    Linking.openURL('tel:+15551234567');
  };

  const openWebsite = () => {
    Linking.openURL('https://vincenthermoso.com');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Ionicons name="mail" size={60} color="#00BFFF" />
        <Text style={styles.title}>Get In Touch</Text>
        <Text style={styles.subtitle}>We'd love to hear from you</Text>
      </View>

      <View style={styles.content}>
        {/* Contact Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Your Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#888"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message here..."
              placeholderTextColor="#888"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
          
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send Message</Text>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Contact Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
            <View style={styles.contactIcon}>
              <Ionicons name="mail" size={24} color="#00BFFF" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>vincenthermoso90@gmail.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FF69B4" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactItem} onPress={openPhone}>
            <View style={styles.contactIcon}>
              <Ionicons name="call" size={24} color="#00BFFF" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>+63 9309063828</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FF69B4" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactItem} onPress={openWebsite}>
            <View style={styles.contactIcon}>
              <Ionicons name="globe" size={24} color="#00BFFF" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Website</Text>
              <Text style={styles.contactValue}>vincenthermoso.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FF69B4" />
          </TouchableOpacity>
          
          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <Ionicons name="location" size={24} color="#00BFFF" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Location</Text>
              <Text style={styles.contactValue}>Secret, Philippines</Text>
            </View>
          </View>
        </View>

        {/* Social Media */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={24} color="#00BFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-twitter" size={24} color="#00BFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-instagram" size={24} color="#00BFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-linkedin" size={24} color="#00BFFF" />
            </TouchableOpacity>
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
  formSection: {
    marginBottom: 30,
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#8A2BE2',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: 'white',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#8A2BE2',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A2BE2',
    padding: 18,
    borderRadius: 8,
    marginTop: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoSection: {
    marginBottom: 30,
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 191, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    color: '#FF69B4',
    fontSize: 14,
    marginBottom: 2,
  },
  contactValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialSection: {
    marginBottom: 30,
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 191, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hoursSection: {
    marginBottom: 30,
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
  },
  hoursList: {
    marginTop: 10,
  },
  hourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  hourDay: {
    color: '#FF69B4',
    fontSize: 16,
  },
  hourTime: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});