import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const UserProfile = () => {
  return (
    <View style={styles.settingContainer}>
      <Text style={styles.text}>Coming Soon </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  settingContainer: {
    flex: 1,
    backgroundColor: '#cadede',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#0A3D62',
    opacity: 0.5,
  },
});
export default UserProfile;
