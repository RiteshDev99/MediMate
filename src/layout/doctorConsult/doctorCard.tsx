import React from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {DoctorDetailsProps} from '../../mockData/doctorDetails.ts';
const DoctorCard = ({doctorData}: {doctorData: DoctorDetailsProps}) => {
  return (
    <Pressable>
      <View style={styles.cardContainer}>
        <Image source={{uri: doctorData.image}} style={styles.userImage} />
        <View style={styles.userItem}>
          <Text style={styles.nameText}>{doctorData.name}</Text>
          <Text style={styles.gmailText}>{doctorData.email}</Text>
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
    backgroundColor: '#dceef6',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  userImage: {
    height: '100%',
    width: 90,
    marginRight: 18,
  },
  userItem: {
    height: 100,
    width: 260,
    paddingRight: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 27,
  },
  nameText: {
    fontSize: 18,
    marginRight: 12,
    fontWeight: '600',
    color: '#2F363F',
  },
  gmailText: {
    fontSize: 13,
    color: '#666',
  },
});
export default DoctorCard;
