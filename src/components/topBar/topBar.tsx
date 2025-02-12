import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App.tsx';
import {useNavigation} from '@react-navigation/native';

type NavBarNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
const TopBar = () => {
  const navigation = useNavigation<NavBarNavigationProp>();
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.topBar}>
        <View style={styles.topBarText}>
          <Text style={styles.welcomeMessage}>👋🏻 Hello !</Text>
          <Text style={styles.userName}>Bugs Writer...</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UserProfileLayout', {userProfile: '10'})
          }>
          <View style={styles.userProfile}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-photo/handsome-surprised-man-with-stunned-expression-rounds-lips-opens-eyes-widely-can-t-believe-latest-sudden-news_273609-16780.jpg',
              }}
              style={styles.userProfile}
            />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DoctorConsultLayout', {doctor: '12', focus: true})
        }
        activeOpacity={1}
      >
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/Icons/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Search here.."
            placeholderTextColor="#282C3F"
            editable={false}
            pointerEvents="none"
          />
          <Image
            source={require('../../assets/Icons/filter.png')}
            style={styles.filterIcon}
          />
        </View>
      </TouchableOpacity>
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
    height: 55,
    width: 55,
    objectFit: 'cover',
    overflow: 'hidden',
    borderRadius: 10,
  },
  inputContainer: {
    height: 50,
    width: 350,
    marginHorizontal: 22,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.46)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    height: 50,
    width: 280,
    borderRadius: 15,
    paddingHorizontal: 15,
    color: '#282C3F',
    fontSize: 16,
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
