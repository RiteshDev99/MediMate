import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const NavBar = () => {
  return (
    <View style={styles.navBarContainer}>
      <TouchableOpacity style={styles.navItem}>
        <Image
          source={require('../../assets/Icons/home.png')}
          style={styles.navIcon}
        />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Image
          source={require('../../assets/Icons/scan.png')}
          style={styles.navIcon}
        />
        <Text style={styles.navText}>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Image
          source={require('../../assets/Icons/chat.png')}
          style={styles.navIcon}
        />
        <Text style={styles.navText}>AI Doctor</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  navBarContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  navItem: {
    height: 60,
    width: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    height: 30,
    width: 30,
  },
  navText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 4,
  },
});
export default NavBar;
