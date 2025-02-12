import React from 'react';
import {StyleSheet, View} from 'react-native';

import DoctorDetailsCard from './doctorDetailCard.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../App.tsx';

type DoctorDetailRouteProp = RouteProp<
  RootStackParamList,
  'DoctorDetailLayout'
>;

const DoctorDetailScreen = () => {
  const route = useRoute<DoctorDetailRouteProp>();
  const {doctorDetails} = route.params;
  return (
    <View style={styles.container}>
      <DoctorDetailsCard doctorData={doctorDetails} />
    </View>
  );
};
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#cadede',
},
});
export default DoctorDetailScreen;
