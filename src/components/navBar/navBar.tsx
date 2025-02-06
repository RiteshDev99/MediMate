import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {OpenCamera} from '../../Utils/cameraUtils.ts';

type NavBarNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface NavItemProps {
  icon: number;
  label: string;
  onPress?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({icon, label, onPress}) => {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <Image source={icon} style={[styles.navIcon]} />
      <Text style={styles.navText}>{label}</Text>
    </TouchableOpacity>
  );
};

const NavBar: React.FC = () => {
  const navigation = useNavigation<NavBarNavigationProp>();

  const handleOpenCamera = async () => {
    try {
      await OpenCamera(capturedImage => {
        navigation.navigate('DetailsLayout', {capturedImage});
      });
    } catch (error) {
      console.log('Camera error:', error);
    }
  };

  const navItems = [
    {
      icon: require('../../assets/Icons/home.png'),
      label: 'Home',
      onPress: () => navigation.navigate('Home'),
    },
    {
      icon: require('../../assets/Icons/barcode-scanner.png'),
      label: 'Scan',
      onPress: handleOpenCamera,
    },
    {
      icon: require('../../assets/Icons/setting.png'),
      label: 'Setting',
      onPress: () => navigation.navigate('SettingsLayout', {setting: '14'}),
    },
  ];
  return (
    <View style={styles.navBarContainer}>
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          label={item.label}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor:'rgba(83,92,104,0.27)',
    backgroundColor: '#cadede',
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
    resizeMode: 'contain',
  },
  navText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 4,
    color: '#333',
  },
});

export default NavBar;
