import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ServiceDto} from '../../dto/serviceDto.ts';
import ServiceCard from './serviceCard.tsx';
const Services = () => {
  const ServiceCardData: ServiceDto[] = [
    {
      id: 1,
      icon: require('../../assets/Icons/doctor.png'),
      bgColor: '#9dc8f2',
    },
    {
      id: 2,
      icon: require('../../assets/Icons/medicine.png'),
      bgColor: '#dfe6b1',
    },
    {
      id: 3,
      icon: require('../../assets/Icons/table.png'),
      bgColor: '#b2d3d9',
    },
    {
      id: 4,
      icon: require('../../assets/Icons/coronavirus.png'),
      bgColor: '#cfb8b9',
    },
  ];
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.titles}>Services</Text>
      <View style={styles.serviceCard}>
        {ServiceCardData.map(item => (
          <ServiceCard key={item.id} icon={item.icon} bgColor={item.bgColor} />
        ))}
      </View>
      <View style={styles.bannerContainer}>
        <View style={styles.bannerCard}>
          <Image
              source={{
                uri: 'https://marketplace.canva.com/EAE_MUyIkCI/1/0/1600w/canva-modern-purple-medical-%28banner-%28landscape%29%29-i-4w5HbUAjc.jpg',
              }}
              style={styles.bannerImage}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    height: 320,
  },
  titles: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  serviceCard: {
    flexDirection: 'row',
    marginTop: 18,
    justifyContent: 'space-evenly',
  },
  bannerContainer: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerCard: {
    height: 170,
    width: 360,
    backgroundColor: '#87a9ed',
    borderRadius: 18,
    overflow: 'hidden',
  },
  bannerImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
});
export default Services;
