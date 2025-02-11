import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, Region} from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';

const GOOGLE_API_KEY = 'AIzaSyCAG8OsefPrDh8wBXH6tiabj4UmuGIClaM';
interface Coordinates {
  latitude: number;
  longitude: number;
}

const HospitalLayout: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState<any[]>([]);
  // @ts-ignore
  const refRBSheet = useRef<RBSheet | null>(null);
  const mapRef = useRef<MapView | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;

    const fetchNearbyHospitals = async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=hospital&key=${GOOGLE_API_KEY}`,
          {signal},
        );
        const result = await response.json();
        return result.results || [];
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching hospitals:', error);
          Alert.alert('Error', 'Failed to fetch hospitals.');
        }
        return [];
      }
    };

    const fetchReverseGeocode = async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'HospitalFinder/1.0 (your.email@example.com)',
            },
            signal,
          },
        );
        return await response.json();
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Reverse Geocoding Error:', error);
        }
        return {display_name: 'Location not available'};
      }
    };

    Geolocation.getCurrentPosition(
      async position => {
        try {
          const {latitude, longitude} = position.coords;
          const newRegion: Region = {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);

          const [hospitalsData, reverseGeocodeData] = await Promise.all([
            fetchNearbyHospitals(latitude, longitude),
            fetchReverseGeocode(latitude, longitude),
          ]);

          setHospitals(hospitalsData);
          setCurrentLocation(reverseGeocodeData.display_name);
          setLoading(false);
          refRBSheet.current?.open();
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        }
      },
      error => {
        console.error('Geolocation Error:', error);
        Alert.alert('Error', 'Failed to get current location.');
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    return () => controller.abort();
  }, []);

  const focusMap = (coordinates: Coordinates) => {
    const newRegion: Region = {
      ...coordinates,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    mapRef.current?.animateToRegion(newRegion, 1000);
  };
  return (
    <View style={styles.container}>
      {region ? (
        <>
          <MapView
            style={styles.map}
            ref={mapRef}
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
              title="Your Location"
            />
            {hospitals.map((hospital, index) => (
              <Marker
                key={`hospital-${index}`}
                coordinate={{
                  latitude: hospital.geometry.location.lat,
                  longitude: hospital.geometry.location.lng,
                }}
                title={hospital.name}
                description={hospital.vicinity}
                pinColor={'#26ae60'}
              />
            ))}
          </MapView>

          <RBSheet
            ref={refRBSheet}
            height={400}
            openDuration={900}
            closeDuration={600}
            customStyles={{
              container: styles.sheetContainer,
              wrapper: styles.sheetWrapper,
              draggableIcon: styles.sheetDraggableIcon,
            }}>
            <View style={styles.sheetHeader}>
              <Image
                source={require('../assets/Icons/location.png')}
                style={styles.headerIcon}
              />
              <Text
                style={styles.sheetTitle}
                numberOfLines={1}
                ellipsizeMode="tail">
                {currentLocation}
              </Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
              {hospitals.length === 0 ? (
                <Text style={styles.noResultsText}>
                  No hospitals found within 10km radius
                </Text>
              ) : (
                hospitals.map((hospital, index) => (
                  <View key={index} style={styles.hospitalCard}>
                    <TouchableOpacity
                      key={`hospital-${index}`}
                      style={styles.hospitalCard}
                      onPress={() =>
                        focusMap({
                          latitude: hospital.geometry.location.lat,
                          longitude: hospital.geometry.location.lng,
                        })
                      }>
                      <Text style={styles.hospitalName}>{hospital.name}</Text>
                      <Text style={styles.hospitalAddress}>
                        {hospital.vicinity}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </ScrollView>
          </RBSheet>
        </>
      ) : (
        <View style={styles.loaderContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#2F363F" />
          ) : (
            <Text style={styles.errorText}>
              Unable to retrieve location. Please check permissions and try
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
    ...StyleSheet.absoluteFillObject,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: '#cadede',
  },
  sheetWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sheetDraggableIcon: {
    backgroundColor: '#D3D3D3',
    width: 50,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(83,92,104,0.27)',
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#2F363F',
  },
  sheetTitle: {
    fontSize: 20,
    flexShrink: 1,
    fontWeight: '600',
    color: '#2F363F',
  },
  scrollContainer: {
    paddingVertical: 5,
  },
  hospitalCard: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F363F',
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#6C757D',
  },
  noResultsText: {
    textAlign: 'center',
    color: '#6C757D',
    fontSize: 16,
    marginTop: 20,
  },
});

export default HospitalLayout;
