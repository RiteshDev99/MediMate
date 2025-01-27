import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import HomeLayout from './layout/homeLayout.tsx';

const App = () => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar backgroundColor={'#c3d9d9'} barStyle={'dark-content'} />
      <HomeLayout />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#c3d9d9',
  },
});

export default App;
