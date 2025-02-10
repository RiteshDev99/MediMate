import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';

const LocationMap = () => {
  return (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
export default LocationMap;
