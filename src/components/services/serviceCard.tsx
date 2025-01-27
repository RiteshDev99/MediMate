import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ServiceDto} from '../../dto/serviceDto.ts';

const ServiceCard = (service: ServiceDto) => {
  return (
      <View style={[styles.serviceCard, {backgroundColor: service.bgColor}]}>
        <Image source={service.icon} style={styles.serviceImage} />
      </View>
  );
};
const styles = StyleSheet.create({
  serviceCard: {
    height: 65,
    width: 65,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceImage: {
    height: 35,
    width: 35,
  },
});
export default ServiceCard;
