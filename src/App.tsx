import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeLayout from './layout/homeLayout';
import AiDoctor from './layout/aiDoctor';
import DetailsLayout from './layout/detailsLayout.tsx';
import HospitalLayout from './layout/hospitalLayout.tsx';
import Setting from './layout/setting.tsx';

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
                backgroundColor: '#c3d9d9',
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
                backgroundColor: '#c3d9d9',
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
                backgroundColor: '#c3d9d9',
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
                backgroundColor: '#c3d9d9',
              },
              title: 'Hospitals Nearby',
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
    backgroundColor: '#c3d9d9',
  },
});

export default App;
