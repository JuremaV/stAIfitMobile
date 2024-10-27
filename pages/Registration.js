import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Registration = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:3000/api/auth/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        await AsyncStorage.setItem('username', username); // Save username
        navigation.navigate('Login');
      }
    } catch (error) {
      setErrorMessage('Registration failed. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon name={passwordVisible ? "eye-slash" : "eye"} size={20} color="#5A315D" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <Icon name={confirmPasswordVisible ? "eye-slash" : "eye"} size={20} color="#5A315D" />
        </TouchableOpacity>
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Register" onPress={handleRegister} color="#5A315D" />
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
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
    backgroundColor: '#D291BC',
    marginBottom: 20,
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C38CB9',
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
  },
  linkText: {
    color: '#5A315D',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default Registration;

