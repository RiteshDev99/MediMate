import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DoctorCard from './doctorCard.tsx';
import {DoctorDetailList} from '../../mockData/doctorDetails.ts';
const DoctorConsult = () => {
  return (
    <ScrollView style={styles.sectionContainer}>
      <View>
        {DoctorDetailList.map((data, index) => (
          <DoctorCard key={index} doctorData={data}/>
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
});
export default DoctorConsult;
