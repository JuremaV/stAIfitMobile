import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        // Redirect to Login if no username is found
        navigation.navigate('Login');
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {username ? `Welcome back, ${username}` : 'Welcome to stAIfit'}
      </Text>
      <Text style={styles.subtitle}>Your AI Fitness Trainer</Text>
      {username ? (
        <>
          <Button
            title="Go to Dashboard"
            onPress={() => navigation.navigate('Dashboard')}
            color="#5A315D"
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
            color="#5A315D"
          />
        </>
      ) : (
        <>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
            color="#5A315D"
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('Registration')}
            color="#5A315D"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4B8E4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5A315D',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#5A315D',
    marginBottom: 30,
  },
  buttonSpacer: {
    height: 20,
  },
});

export default Home;


