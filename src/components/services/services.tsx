import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ServiceDto} from '../../dto/serviceDto.ts';
import ServiceCard from './serviceCard.tsx';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
type NavBarNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
const Services = () => {
  const navigation = useNavigation<NavBarNavigationProp>();
  const ServiceCardData: ServiceDto[] = [
    {
      id: 1,
      icon: require('../../assets/Icons/doctor.png'),
      bgColor: '#9dc8f2',
      label: 'AI Doctor',
    },
    {
      id: 2,
      icon: require('../../assets/Icons/medicine.png'),
      bgColor: '#dfe6b1',
      label: 'Medicine',
    },
    {
      id: 3,
      icon: require('../../assets/Icons/location.png'),
      bgColor: '#b2d3d9',
      label: 'Location',
      onPress: () => navigation.navigate('HospitalLayout', {hospital: '13'}),
    },
    {
      id: 4,
      icon: require('../../assets/Icons/coronavirus.png'),
      bgColor: '#cfb8b9',
      label: 'Germs',
    },
  ];
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.titles}>Services</Text>
      <View style={styles.serviceCard}>
        {ServiceCardData.map(item => (
          <ServiceCard
            key={item.id}
            icon={item.icon}
            bgColor={item.bgColor}
            onPress={item.onPress}
            label={item.label}
          />
        ))}
      </View>
      <View style={styles.bannerContainer}>
        <View style={styles.bannerCard}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}>
            <Image
              source={{
                uri: 'https://marketplace.canva.com/EAE_MUyIkCI/1/0/1600w/canva-modern-purple-medical-%28banner-%28landscape%29%29-i-4w5HbUAjc.jpg',
              }}
              style={styles.bannerImage}
            />
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/019/080/489/non_2x/healthcare-and-medical-service-doctor-banner-medical-health-social-media-cover-design-realistic-hospital-webinar-template-free-vector.jpg',
              }}
              style={styles.bannerImage}
            />
            <Image
                source={{
                  uri: 'https://static.vecteezy.com/system/resources/previews/018/882/566/non_2x/healthcare-and-medical-service-doctor-banner-medical-health-social-media-cover-design-realistic-hospital-webinar-template-free-vector.jpg',
                }}
                style={styles.bannerImage}
            />
            <Image
                source={{
                  uri: 'https://static.vecteezy.com/system/resources/previews/018/882/561/non_2x/healthcare-and-medical-service-doctor-banner-medical-health-social-media-cover-design-realistic-hospital-webinar-template-free-vector.jpg',
                }}
                style={styles.bannerImage}
            />
          </ScrollView>
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
    flexDirection: 'row',
  },
  bannerCard: {
    height: 170,
    width: 360,
    // backgroundColor: '#87a9ed',
    borderRadius: 18,
    overflow: 'hidden',
  },
  bannerImage: {
    height: 170,
    width: 360,
    objectFit: 'cover',
    borderRadius: 18,
  },
  scrollContent: {
    flexDirection: 'row',
    overflow: 'hidden',
    gap:16,
  },
});
export default Services;
