// GPSTracking.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GPSMapView from './GPSMapView'; // Ensure this import points to the correct file path
import Geolocation from '@react-native-community/geolocation';

const GPSTracking = () => {
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });
      },
      (error) => console.log("Error fetching location: ", error.message),
      { enableHighAccuracy: true, distanceFilter: 0, interval: 5000 }
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real-time GPS Tracking</Text>
      <Text>Latitude: {position.latitude || "Fetching..."}</Text>
      <Text>Longitude: {position.longitude || "Fetching..."}</Text>
      <View style={styles.mapContainer}>
        <GPSMapView latitude={position.latitude} longitude={position.longitude} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3C6E2',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
});

export default GPSTracking;


