import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const Goals = ({ navigation }) => {
  const [goalCategory, setGoalCategory] = useState('running'); // Default category
  const [target, setTarget] = useState('');
  const [mealPlan, setMealPlan] = useState(''); // For diet plans
  const [message, setMessage] = useState('');

  const handleAddGoal = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Retrieve token
      console.log("Token retrieved from AsyncStorage:", token);

      // Prepare data based on goal category
      const goalData = {
        goalCategory,
        target: goalCategory === 'diet' ? mealPlan : Number(target),
      };

      const response = await axios.post(
        'http://10.0.2.2:3000/api/goals',
        goalData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the header
          },
        },
      );
      setMessage('Goal added successfully');
    } catch (error) {
      setMessage(
        error.response?.data?.msg || 'Error adding goal. Please try again.',
      );
      console.error('Detailed Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Goal</Text>

      {/* Goal Category Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={goalCategory}
          onValueChange={(value) => {
            setGoalCategory(value);
            setTarget(''); // Reset target when category changes
            setMealPlan(''); // Reset mealPlan when category changes
          }}
          style={styles.picker}
        >
          <Picker.Item label="Running" value="running" />
          <Picker.Item label="Walking" value="walking" />
          <Picker.Item label="Workout" value="workout" />
          <Picker.Item label="Diet Plan" value="diet" />
        </Picker>
      </View>

      {/* Conditional Input Fields Based on Goal Category */}
      {goalCategory === 'running' || goalCategory === 'walking' ? (
        <TextInput
          placeholder="Distance in km"
          value={target}
          onChangeText={(value) => setTarget(value.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          style={styles.input}
        />
      ) : goalCategory === 'workout' ? (
        <TextInput
          placeholder="Duration in minutes"
          value={target}
          onChangeText={(value) => setTarget(value.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          style={styles.input}
        />
      ) : goalCategory === 'diet' ? (
        <TextInput
          placeholder="Meal Plan (e.g., Breakfast: Oats, Lunch: Salad)"
          value={mealPlan}
          onChangeText={setMealPlan}
          style={styles.input}
        />
      ) : null}

      {/* Add Goal Button */}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleAddGoal}>
        <Text style={styles.buttonText}>Add Goal</Text>
      </TouchableOpacity>
      
      {/* Success/Error Message */}
      {message ? (
        <Text
          style={{
            ...styles.message,
            color: message === 'Goal added successfully' ? 'green' : 'red',
          }}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4B8E4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#D291BC',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#C38CB9',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    color: '#5A315D',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C38CB9',
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#5A315D',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Goals;




