import React from 'react';
import {StyleSheet, View} from 'react-native';
import DoctorCard from './doctorCard.tsx';
import {DoctorDetailList} from '../../mockData/doctorDetails.ts';
const DoctorConsult = () => {
  return (
    <View style={styles.sectionContainer}>
      {DoctorDetailList.map((data, index) => (
        <DoctorCard key={index} doctorData={data} />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#cadede',
  },
});
export default DoctorConsult;
