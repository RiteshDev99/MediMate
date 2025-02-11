import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, Region} from 'react-native-maps';

const GOOGLE_API_KEY = 'AIzaSyCAG8OsefPrDh8wBXH6tiabj4UmuGIClaM';

const HospitalLayout: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState<any[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;

    const fetchNearbyHospitals = async (lat: number, lng: number) => {
      const radius = 1000;
      const type = 'hospital';
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;

      try {
        const response = await fetch(url, {signal});
        const result = await response.json();
        if (!signal.aborted) {
          setHospitals(result.results || []);
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching nearby hospitals:', error);
        }
      }
    };

    try {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const newRegion: Region = {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
          fetchNearbyHospitals(latitude, longitude);

          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'YourAppName/1.0 (your.email@example.com)',
              },
              signal,
            },
          )
            .then(response => response.json())
            .then(data => {
              if (!signal.aborted) {
                setCurrentLocation(data?.display_name || 'Address not found');
                setLoading(false);
              }
            })
            .catch(error => {
              if (error.name !== 'AbortError') {
                console.error('Reverse Geocoding Error:', error);
                Alert.alert('Error', 'Failed to fetch address.');
                setLoading(false);
              }
            });
        },
        error => {
          if (!signal.aborted) {
            console.error('Geolocation Error:', error);
            Alert.alert('Location Error', 'Failed to get current location.');
            setLoading(false);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    } catch (error) {
      console.log('Try again ', error);
    }

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <View style={styles.container}>
      {region ? (
        <>
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation
            showsMyLocationButton
            zoomEnabled
            zoomControlEnabled>
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="You are here"
            />
            {hospitals.map((hospital, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: hospital.geometry.location.lat,
                  longitude: hospital.geometry.location.lng,
                }}
                title={hospital.name}
                pinColor="green"
              />
            ))}
          </MapView>
          {!loading && currentLocation && (
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
          )}
        </>
      ) : (
        <View style={styles.loaderContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <Text style={styles.errorText}>
              Unable to retrieve location. Please check your permissions and try
              again.
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cadede',
  },
  map: {
    flex: 1,
  },
  currentLocation: {
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cadede',
  },
  location: {
    fontSize: 17,
    flexShrink: 1,
  },
  locationIcon: {
    height: 30,
    width: 30,
    marginRight: 8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
});

export default HospitalLayout;
