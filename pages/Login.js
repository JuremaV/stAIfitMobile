import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/auth/login', {
        email,
        password,
      });
      
      console.log("API Response:", response.data); // Log the API response
  
      if (response.data.token) {
        await AsyncStorage.setItem('authToken', response.data.token);
        
        // Check if username and email are defined and set them, else log a warning
        if (response.data.username) {
          await AsyncStorage.setItem('username', response.data.username);
        } else {
          console.warn("Username is undefined in the response");
        }
  
        if (response.data.email) {
          await AsyncStorage.setItem('userEmail', response.data.email);
        } else {
          console.warn("Email is undefined in the response");
        }
  
        setErrorMessage(''); // Clear any previous error message
        navigation.navigate('Home'); // Navigate to Home screen
      } else {
        setErrorMessage('Unexpected response from the server.');
      }
    } catch (error) {
      console.log("Login error:", error); // Log the full error for debugging
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Invalid credentials. Please try again.');
      } else {
        setErrorMessage('Network error. Please check your connection.');
      }
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>stAIfit Login</Text>
      <TextInput
        placeholder="Email or Username"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Login" onPress={handleLogin} color="#5A315D" />
      <View style={styles.links}>
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password?
        </Text>
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('Registration')}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4B8E4',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#D291BC',
    marginBottom: 20,
    textAlign: 'center',
    paddingVertical: 10,
    color: '#5A315D',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C38CB9',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginVertical: 5,
    textAlign: 'center',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  linkText: {
    color: '#5A315D',
    textDecorationLine: 'underline',
  },
});

export default Login;








