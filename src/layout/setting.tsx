import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const Setting = () => {
  return (
    <View style={styles.settingContainer}>
      <Text>hello i am setting</Text>
    </View>
  );
};
const styles = StyleSheet.create({
settingContainer: {
    flex: 1,
    backgroundColor: '#c3d9d9',
},
});
export default Setting;
