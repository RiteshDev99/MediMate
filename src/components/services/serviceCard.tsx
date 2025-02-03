import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ServiceDto} from '../../dto/serviceDto.ts';

const ServiceCard = (service: ServiceDto) => {
  return (
    <TouchableOpacity onPress={service.onPress}>
      <View style={[styles.serviceCard, {backgroundColor: service.bgColor}]}>
        <Image source={service.icon} style={styles.serviceImage} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  serviceCard: {
    height: 62,
    width: 64,
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
