import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

export const OpenCamera = async (
  setCameraImage: (image: ImageOrVideo) => void,
) => {
  try {
    const image = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    });
    console.log(image, 'image');
    setCameraImage(image);
  } catch (error) {
    console.log(error, 'error');
  }
};
