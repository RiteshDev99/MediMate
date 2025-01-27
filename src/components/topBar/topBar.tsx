import React from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
const TopBar = () => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.topBar}>
        <View style={styles.topBarText}>
          <Text style={styles.welcomeMessage}>👋🏻 Hello !</Text>
          <Text style={styles.userName}>Jhone Doe..</Text>
        </View>
        <View style={styles.userProfile}>
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/08/86/86/31/360_F_886863195_f20F46VBjpLwB1QhAYmAVcIMQUZ6JIWp.jpg',
            }}
            style={styles.userProfile}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../assets/Icons/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Search here.."
          placeholderTextColor="#282C3F"
        />
        <Image
          source={require('../../assets/Icons/filter.png')}
          style={styles.filterIcon}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    height: 170,
    width: '100%',
    // backgroundColor: 'red',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  topBarText: {
    flexDirection: 'column',
    gap: 1,
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'semibold',
    color: '#282C3F',
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#282C3F',
  },
  userProfile: {
    height: 52,
    width: 52,
    backgroundColor: 'red',
    overflow: 'hidden',
    borderRadius: 10,
  },
  inputContainer: {
    height: 50,
    width: 350,
    marginHorizontal: 22,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
  },
  inputBox: {
    height: 50,
    width: 280,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  searchIcon: {
    height: 24,
    width: 24,
  },
  filterIcon: {
    height: 27,
    width: 27,
  },
});
export default TopBar;
