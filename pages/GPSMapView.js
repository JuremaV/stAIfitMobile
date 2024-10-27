import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GPSMapView = ({ latitude, longitude }) => {
  // Set Cape Town as the default location if no location is provided
  const [region, setRegion] = useState({
    latitude: latitude || -33.9249,  // Latitude for Cape Town
    longitude: longitude || 18.4241, // Longitude for Cape Town
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    // Update the region if the latitude and longitude props change
    if (latitude && longitude) {
      setRegion((prev) => ({
        ...prev,
        latitude,
        longitude,
      }));
    }
  }, [latitude, longitude]);

  return (
    <MapView
      style={styles.map}
      region={region}
      onRegionChangeComplete={(region) => setRegion(region)}
    >
      {latitude && longitude && (
        <Marker coordinate={{ latitude, longitude }} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 300,
  },
});

export default GPSMapView;


