import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.description}>Track your goals and progress</Text>
      
      <Button 
        title="View Goals"
        onPress={() => navigation.navigate('Goals')}
        color="#5A315D"
      />

      <View style={styles.buttonSpacer} />
      
      <Button 
        title="Start Tracking"
        onPress={() => navigation.navigate('GPSTracking')} 
        color="#5A315D"
      />

      <View style={styles.buttonSpacer} />

      <Button 
        title="Diet Plan Chatbot"
        onPress={() => navigation.navigate('Chatbot')} 
        color="#5A315D"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4B8E4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A315D',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#5A315D',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonSpacer: {
    height: 20, // Adds space between buttons
  },
});

export default Dashboard;




