import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeLayout from './layout/homeLayout';
import AiDoctor from './layout/aiDoctor';
import DetailsLayout from './layout/detailsLayout.tsx';
import HospitalLayout from './layout/hospitalLayout.tsx';
import Setting from './layout/setting.tsx';
import DoctorConsult from './layout/doctorConsult/doctorConsult.tsx';
import DoctorDetailScreen from './layout/doctorConsult/doctorDetailScreen.tsx';
import {DoctorDetailsProps} from './mockData/doctorDetails.ts';

export type RootStackParamList = {
  Home: undefined;
  AIDoctor: {
    aiDoctor: string;
  };
  HospitalLayout: {
    hospital: string;
  };
  DetailsLayout: {capturedImage?: any; title?: string};
  SettingsLayout: {
    setting: string;
  };
  DoctorConsultLayout: {
    doctor: string;
  };
  DoctorDetailLayout: {
    doctorDetails: DoctorDetailsProps;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar backgroundColor="#cadede" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeLayout}
            options={{
              headerShown: false,
              animation: 'slide_from_left',
              navigationBarColor: '#cadede',
            }}
          />
          <Stack.Screen
            name="AIDoctor"
            component={AiDoctor}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
              headerStyle: {
                backgroundColor: '#cadede',
              },
              title: 'AI Doctor',
            }}
          />
          <Stack.Screen
            name="DetailsLayout"
            component={DetailsLayout}
            options={{
              headerShown: true,
              animation: 'slide_from_left',
              headerStyle: {
                backgroundColor: '#cadede',
              },
              title: 'Medicine Details',
            }}
          />
          <Stack.Screen
            name="SettingsLayout"
            component={Setting}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
              headerStyle: {
                backgroundColor: '#cadede',
              },
              title: 'Setting',
            }}
          />
          <Stack.Screen
            name="HospitalLayout"
            component={HospitalLayout}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
              headerStyle: {
                backgroundColor: '#cadede',
              },
              title: 'Hospitals Nearby',
            }}
          />
          <Stack.Screen
            name="DoctorConsultLayout"
            component={DoctorConsult}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
              headerStyle: {
                backgroundColor: '#cadede',
              },
              title: 'Doctor Consult',
            }}
          />
          <Stack.Screen
            name="DoctorDetailLayout"
            component={DoctorDetailScreen}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
              headerStyle: {
                backgroundColor: '#cadede',
              },
              title: 'Doctor Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#cadede',
  },
});

export default App;
