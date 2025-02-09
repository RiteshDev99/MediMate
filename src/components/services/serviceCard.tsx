import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ServiceDto} from '../../dto/serviceDto.ts';
const ServiceCard = (service: ServiceDto) => {
  return (
    <TouchableOpacity onPress={service.onPress} style={styles.mainContainer}>
      <View style={[styles.serviceCard, {backgroundColor: service.bgColor}]}>
        <Image source={service.icon} style={styles.serviceImage} />
      </View>
      <Text style={styles.lable}>{service.label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    height: 83,
    width: 85,
    flexDirection: 'column',
    alignItems: 'center',
  },
  serviceCard: {
    height: 62,
    width: 64,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  serviceImage: {
    height: 35,
    width: 35,
  },
  lable:{
    fontSize: 15,
    textAlign: 'center',
    marginTop: 4,
    color: '#333',
  },
});
export default ServiceCard;
