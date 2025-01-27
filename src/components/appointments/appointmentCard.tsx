import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppointmentDto} from '../../dto/appointmentDto.ts';

const AppointmentCard = (Appointment: AppointmentDto) => {
  return (
    <View
      style={[
        styles.appointmentCard,
        {backgroundColor: Appointment.bgColor},
      ]}>
      <View style={styles.innerBox}>
        <Text style={styles.text}>{Appointment.title}</Text>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  appointmentCard: {
    height: 125,
    width: 255,
    borderRadius: 10,
  },
  innerBox:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AppointmentCard;
