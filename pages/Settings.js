import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedEmail = await AsyncStorage.getItem('userEmail');
      setUsername(storedUsername || 'Not available');
      setEmail(storedEmail || 'Not available');
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userEmail');

    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.sectionHeader}>Profile</Text>
      <Text>Username: {username}</Text>
      <Text>Email: {email}</Text>

      <View style={styles.buttonSpacer} />

      <Text style={styles.sectionHeader}>Contact Us</Text>
      <Text>Email: juremavidal.jv62@gmail.com</Text>
      <Text>Phone: +27 0781 830 976</Text>

      <View style={styles.buttonSpacer} />

      <Text style={styles.sectionHeader}>About Us</Text>
      <Text>stAIfit is your AI-driven fitness app to help you meet your goals.</Text>

      <View style={styles.buttonSpacer} />

      <Button title="Logout" onPress={handleLogout} color="#5A315D" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4B8E4',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A315D',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5A315D',
    marginTop: 20,
    marginBottom: 5,
  },
  buttonSpacer: {
    height: 20,
  },
});

export default Settings;

