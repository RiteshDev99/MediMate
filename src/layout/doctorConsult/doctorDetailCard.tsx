import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {DoctorDetailsProps} from '../../mockData/doctorDetails.ts';

const DoctorDetailsCard = ({doctorData}: {doctorData: DoctorDetailsProps}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.userProfile}>
        <Image source={{uri: doctorData.image}} style={styles.userImage} />
        <Text style={styles.nameText}>{doctorData.name}</Text>
        <Text style={styles.emailText}>{doctorData.email}</Text>
      </View>
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>{doctorData.location}</Text>
        </View>
      </View>
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Qualification</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>{doctorData.Qualification}</Text>
        </View>
          <Text style={styles.sectionTitle}>Experience</Text>
          <View style={styles.detailRow}>
              <Text style={styles.detailText}>{doctorData.Experience}</Text>
          </View>
          <Text style={styles.sectionTitle}>Language's</Text>
          <View style={styles.detailRow}>
              <Text style={styles.detailText}>{doctorData.language}</Text>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 16,
    padding: 20,
  },
  userProfile: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  userImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#2F363F',
    marginBottom: 12,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F363F',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 14,
    color: '#666',
  },
  detailsSection: {
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F363F',
      marginTop:8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2F363F',
    paddingBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F363F',
    marginRight: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
});

export default DoctorDetailsCard;
