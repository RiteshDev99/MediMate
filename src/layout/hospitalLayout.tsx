import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';

const HospitalLayout: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState('');
  useEffect(() => {
    GetCurrentLocation();
  }, []);
  const GetCurrentLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        (position: GeolocationResponse) => {
          const {latitude, longitude} = position.coords;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'YourAppName/1.0 (your.email@example.com)',
              },
            },
          )
            .then(response => response.json())
            .then(data => {
              if (data && data.display_name) {
                console.log('Address:', data.display_name);
                setCurrentLocation(data.display_name);
              } else {
                Alert.alert(
                  'Location Retrieved',
                  `Latitude: ${latitude}\nLongitude: ${longitude}\nNo address found.`,
                );
              }
            })
            .catch((geoError: any) => {
              console.error('Reverse Geocoding Error:', geoError);
              Alert.alert('Reverse Geocoding Error', geoError.message);
            });
        },
        (error: GeolocationError) => {
          console.error('Geolocation Error:', error);
          Alert.alert('Location Error', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {currentLocation ? (
          <View style={styles.currentLocation}>
            <Image
              source={require('../assets/Icons/location.png')}
              style={styles.locationIcon}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.location}>
              {currentLocation}
            </Text>
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            color="#000000"
            style={styles.loader}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c3d9d9',
  },
  currentLocation: {
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#cadede',
  },
  location: {
    fontSize: 17,
    flexWrap: 'nowrap',
    flexShrink: 1,
  },
  locationIcon: {
    height: 30,
    width: 30,
  },
  loader: {
    height: '100%',
    width: '100%',
  },
});

export default HospitalLayout;
