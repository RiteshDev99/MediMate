import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppointmentDto} from '../../dto/appointmentDto.ts';
import AppointmentCard from './appointmentCard.tsx';

const Appointments = () => {
  const AppointmentsCardData: AppointmentDto[] = [
    {
      id: 1,
      bgColor: '#65c2c2',
      title: 'Welcome',
    },
    {
      id: 2,
      bgColor: '#f5aa4e',
      title: 'To',
    },
    {
      id: 3,
      bgColor: '#a18deb',
      title: 'Medimate',
    },
    {
      id: 4,
      bgColor: '#0fe4f7',
      title: ':)',
    },
  ];

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.titles}>Upcoming Appointments</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {AppointmentsCardData.map(appointment => (
          <AppointmentCard
            key={appointment.id}
            bgColor={appointment.bgColor}
            title={appointment.title}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    height: 190,
    width: '100%',
    marginTop: 10,
  },
  titles: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 20,
  },
});

export default Appointments;
