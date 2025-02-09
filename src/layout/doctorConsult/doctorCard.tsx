import React from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { DoctorDetailsProps } from '../../mockData/doctorDetails';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type NavBarNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'DoctorDetailLayout'
>;

const DoctorCard = ({ doctorData }: { doctorData: DoctorDetailsProps }) => {
  const navigation = useNavigation<NavBarNavigationProp>();

  return (
      <Pressable
          onPress={() => navigation.navigate('DoctorDetailLayout', { doctorDetails: doctorData })}
      >
        <View style={styles.cardContainer}>
          <Image source={{ uri: doctorData.image }} style={styles.userImage} />
          <View style={styles.userItem}>
            <Text style={styles.nameText}>{doctorData.name}</Text>
            <Text style={styles.gmailText}>{doctorData.email}</Text>
            <Text style={styles.QualificationText}>{doctorData.Qualification}</Text>
          </View>
        </View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 12,
    marginVertical: 8,
    height: 90,
    backgroundColor: '#bed1d7',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  userImage: {
    height: 90,
    width: 90,
    marginRight: 18,
  },
  userItem: {
    height: '100%',
    width: '100%',
    padding:10,
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F363F',
  },
  gmailText: {
    fontSize: 15,
    color: '#2F363F',
  },
  QualificationText:{
    fontSize: 13,
    color: '#666',
  },
});

export default DoctorCard;
