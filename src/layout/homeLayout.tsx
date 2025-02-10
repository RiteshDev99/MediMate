import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import TopBar from '../components/topBar/topBar.tsx';
import Services from '../components/services/services.tsx';
import NavBar from '../components/navBar/navBar.tsx';
import News from '../components/news/news.tsx';
const HomeLayout = () => {
  return (
    <View style={styles.sectionContainer}>
      <ScrollView>
        <TopBar />
        <Services />
        <News />
      </ScrollView>
      <NavBar />
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#cadede',
  },
});
export default HomeLayout;
