import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import GPSTracking from './pages/GPSTracking'; 
import Chatbot from './Chatbot';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Login');

  const requestLocationPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios' 
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      console.log("Location permission result:", result);
    } catch (error) {
      console.log("Permission error:", error);
    }
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const username = await AsyncStorage.getItem('username');
      if (username) {
        setInitialRoute('Home');
      } else {
        setInitialRoute('Login');
      }
    };
    checkUserLoggedIn();
    requestLocationPermission();
  }, []);

  if (!initialRoute) return null; // Wait until we know the initial route

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Goals" component={Goals} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="GPSTracking" component={GPSTracking} />
        <Stack.Screen name="Chatbot" component={Chatbot} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



