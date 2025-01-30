import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';

const DetailsLayout = ({route}: any) => {
  const [cameraImage, setCameraImage] = useState<ImageOrVideo>();

  useEffect(() => {
    if (route?.params?.capturedImage) {
      setCameraImage(route.params.capturedImage);
    }
  }, [route?.params?.capturedImage]);

  return (
      <View style={styles.sectionContainer}>
          <View style={styles.imageContainer}>
              <Image source={{uri: cameraImage?.path}} style={styles.bgImage} />
              <Image source={{uri: cameraImage?.path}} style={styles.picture} />
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
    sectionContainer:{
        flex: 1,
        backgroundColor: '#c3d9d9',
    },
  imageContainer: {
    width: '100%',
    height: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  picture: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    shadowColor: '#000',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
      filter:'blur(5px)',
  },
});

export default DetailsLayout;
