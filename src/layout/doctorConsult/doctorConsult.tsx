import React from 'react';
import {Image, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import DoctorCard from './doctorCard.tsx';
import {DoctorDetailList} from '../../mockData/doctorDetails.ts';
import {RootStackParamList} from '../../App.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';

type NavBarNavigationProp = RouteProp<
  RootStackParamList,
  'DoctorConsultLayout'
>;
const DoctorConsult = () => {
  const route = useRoute<NavBarNavigationProp>();

  const focus: boolean = route.params.focus;

  return (
    <ScrollView style={styles.sectionContainer}>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../assets/Icons/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Search here.."
          placeholderTextColor="#282C3F"
          autoFocus={focus}
        />
        <Image
          source={require('../../assets/Icons/filter.png')}
          style={styles.filterIcon}
        />
      </View>
      <View>
        {DoctorDetailList.map((data, index) => (
          <DoctorCard key={index} doctorData={data} />
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#cadede',
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    width: 370,
    marginHorizontal: 12,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.37)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    height: 50,
    width: 300,
    borderRadius: 15,
    paddingHorizontal: 15,
    color: '#282C3F',
    fontSize: 16,
  },
  searchIcon: {
    height: 24,
    width: 24,
  },
  filterIcon: {
    height: 27,
    width: 27,
  },
});
export default DoctorConsult;
