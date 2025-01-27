import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';

const AiDoctor = () => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.messageBox}>
        <Text style={styles.welcomeMessage}>Hello, Jhone..</Text>
      </View>
      <View style={styles.inputBox}>
        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/Icons/add.png')}
            style={styles.addIcon}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="What's in your mind"
            placeholderTextColor="#282C3F"
          />
          <Image
            source={require('../assets/Icons/mic.png')}
            style={styles.micIcon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#c3d9d9',
  },
  messageBox: {
    height: '80%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeMessage: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputBox: {
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    height: 65,
    width: 365,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 30,
    alignItems: 'center',
  },
  TextInput: {
    height: 65,
    width: 280,
    borderRadius: 30,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#282C3F',
  },
  addIcon: {
    height: 30,
    width: 30,
  },
  micIcon: {
    height: 30,
    width: 30,
  },
});
export default AiDoctor;
