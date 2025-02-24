import React, {useEffect, useRef} from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import ServiceCard from './serviceCard.tsx';
import {ServiceDto} from '../../dto/serviceDto.ts';

type NavBarNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const Services = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<NavBarNavigationProp>();

  useEffect(() => {
    let scrollX = 0;
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({x: scrollX, animated: true});
        scrollX += 380;
        if (scrollX > 380 * 3) {
          scrollX = 0;
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const ServiceCardData: ServiceDto[] = [
    {
      id: 1,
      icon: require('../../assets/Icons/chatbot.png'),
      bgColor: '#9dc8f2',
      label: 'AI Doctor',
      onPress: () => navigation.navigate('AIDoctor', {aiDoctor: '12'}),
    },
    {
      id: 2,
      icon: require('../../assets/Icons/hospital-building.png'),
      bgColor: '#b2d3d9',
      label: 'Hospital',
      onPress: () => navigation.navigate('HospitalLayout', {hospital: '13'}),
    },
    {
      id: 4,
      icon: require('../../assets/Icons/emergency.png'),
      bgColor: '#ff9999',
      label: 'Emergency',
      onPress: () => OneTapCall(108),
    },
    {
      id: 3,
      icon: require('../../assets/Icons/doctor.png'),
      bgColor: 'rgba(106,137,204,0.58)',
      label: 'Consult ',
      onPress: () =>
        navigation.navigate('DoctorConsultLayout', {
          doctor: '14',
          focus: false,
        }),
    },
  ];

  const OneTapCall = (number: number) => {
    let phoneNumber =
      Platform.OS === 'android' ? `tel:${number}` : `telprompt:${number}`;
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.bannerContainer}>
        <View style={styles.bannerCard}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/042/971/984/non_2x/blue-doctor-wireframe-ai-medical-line-medical-treatment-illustration-use-ai-to-help-treat-concept-and-modern-on-health-background-health-insurance-vector.jpg',
              }}
              style={styles.bannerImage}
            />
            <Image
              source={{
                uri: 'https://www.shutterstock.com/image-photo/hand-touch-button-emergency-app-600nw-2277525315.jpg',
              }}
              style={styles.bannerImage}
            />
            <Image
              source={{
                uri: 'https://acldigital.com/wp-content/uploads/2024/10/RTLS-Asset-tracking-with-BLE-Blog-Banner.jpg',
              }}
              style={styles.bannerImage}
            />
            <Image
              source={{
                uri: 'https://www.moneymax.ph/hs-fs/hubfs/Online_Medical_Consultation_Options.png?width=680&name=Online_Medical_Consultation_Options.png',
              }}
              style={styles.bannerImage}
            />
          </ScrollView>
        </View>
      </View>
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
    marginTop: 15,
  },
  serviceCard: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-evenly',
  },
  bannerContainer: {
    flex: 1,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bannerCard: {
    height: 170,
    width: 360,
    borderRadius: 18,
    overflow: 'hidden',
  },
  bannerImage: {
    height: 170,
    width: 360,
    resizeMode: 'cover',
    borderRadius: 18,
  },
  scrollContent: {
    flexDirection: 'row',
    gap: 16,
  },
});

export default Services;
