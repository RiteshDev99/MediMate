import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {scannerPrompt} from '../Utils/scannerPrompt.ts';
const genAI = new GoogleGenerativeAI('AIzaSyA4rVvuafsdJRNCAS5KkRqk8rDqG8iP_4A');

interface RouteParams {
  capturedImage: ImageOrVideo;
}

interface DetailsLayoutProps {
  route: {
    params: RouteParams;
  };
}
function extractJson<T>(str: string): T | null {
  const match = str.match(/```json\s*([\s\S]*?)\s*```/);
  if (match) {
    try {
      return JSON.parse(match[1]) as T;
    } catch (error) {
      console.error('Invalid JSON:', error);
      return null;
    }
  }
  return null;
}

const DetailsLayout: React.FC<DetailsLayoutProps> = ({route}) => {
  const [cameraImage, setCameraImage] = useState<ImageOrVideo | null>(null);
  const [geminiResponse, setGeminiResponse] = useState<MedicineInfo | null>(
    null,
  );
  useEffect(() => {
    const sendImageToGemini = async (image: ImageOrVideo) => {
      try {
        const model = genAI.getGenerativeModel({
          model: 'models/gemini-1.5-flash',
          systemInstruction: {
            role: 'model',
            parts: [
              {
                text: scannerPrompt,
              },
            ],
          },
        });

        const response = await fetch(image.path);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const blob = await response.blob();
        const base64Data = await blobToBase64(blob);
        const result = await model.generateContent([
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/jpeg',
            },
          },
          'Analyze this medicine and respond in specified JSON format.',
        ]);
        const newResponse = extractJson<MedicineInfo>(result.response.text());
        if (newResponse != null) {
          setGeminiResponse(newResponse);
        }
      } catch (error) {
        Alert.alert('something went wrong:');
      }
    };

    if (route?.params?.capturedImage) {
      setCameraImage(route.params.capturedImage);
      sendImageToGemini(route.params.capturedImage);
    }
    if (geminiResponse?.message) {
      Alert.alert('Invalid Image', geminiResponse.message);
      console.log('Gemini response:', geminiResponse.message);
    }
  }, [route?.params?.capturedImage, geminiResponse?.message]);
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const base64String = reader.result as string;
          const base64Data = base64String.split(',')[1];
          resolve(base64Data);
        } else {
          reject(new Error('Failed to read blob as base64.'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to read blob.'));
      };
      reader.readAsDataURL(blob);
    });
  };

  if (!cameraImage || !cameraImage.path) {
    return <Text>No image available.</Text>;
  }

  return (
    <ScrollView style={styles.sectionContainer}>
      <View style={styles.detailsContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: cameraImage?.path}} style={styles.bgImage} />
          <Image source={{uri: cameraImage?.path}} style={styles.picture} />
        </View>
        {geminiResponse ? (
          <View style={styles.chatBox}>
            {geminiResponse.message ? (
              <>
                <Text style={styles.errorMessage}>
                  {geminiResponse.message}
                </Text>
              </>
            ) : (
              <View style={styles.medicenDetails}>
                <View style={styles.genericName}>
                  <Text style={styles.name}>
                    {geminiResponse?.identification?.generic_name}
                  </Text>
                </View>
                <View style={styles.genericName}>
                  <Text style={styles.title}>Alternative Name</Text>
                  {geminiResponse?.alternatives?.map(data => (
                    <Text key={data.name} style={styles.desc}>
                      {data.name}
                    </Text>
                  ))}
                </View>
                <View style={styles.genericName}>
                  <Text style={styles.title}>Brand Name</Text>
                  <Text style={styles.desc}>
                    {geminiResponse?.identification?.brand_names}
                  </Text>
                </View>
                <View style={styles.genericName}>
                  <Text style={styles.title}>Generic Price</Text>
                  <Text style={styles.desc}>
                    {geminiResponse?.cost_in_INR?.generic}
                  </Text>
                </View>
                <View style={styles.genericName}>
                  <Text style={styles.title}>Branded Price</Text>
                  <Text style={styles.desc}>
                    {geminiResponse?.cost_in_INR?.branded}
                  </Text>
                </View>
                <View style={styles.genericName}>
                  <Text style={styles.title}>Doses</Text>
                  <Text style={styles.desc}>{geminiResponse?.usage?.dose}</Text>
                </View>
                <View style={styles.genericName}>
                  <Text style={styles.title}>Who Should Avoid</Text>
                  <Text style={styles.desc}>
                    {geminiResponse?.usage?.avoid_if}
                  </Text>
                </View>
                <View style={styles.genericName}>
                  <Text style={styles.title}>Serious Risks</Text>
                  <Text style={styles.desc}>
                    {geminiResponse?.safety?.serious_risks}
                  </Text>
                </View>
                <View style={styles.genericName}>
                  <Text style={styles.title}>Use Case</Text>
                  {geminiResponse?.alternatives?.map(data => (
                    <Text key={data.use_case} style={styles.desc}>
                      {data.use_case}
                    </Text>
                  ))}
                </View>
                <View style={styles.genericName}>
                  <Text style={styles.title}>Interactions</Text>
                  <Text style={styles.desc}>
                    {geminiResponse?.key_advice?.interactions}
                  </Text>
                </View>
                <View style={styles.genericName}>
                  <Text style={styles.title}>Storage</Text>
                  <Text style={styles.desc}>
                    {geminiResponse?.key_advice?.storage}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            color="#000000"
            style={styles.loader}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#cadede',
  },
  detailsContainer: {
    flex: 1,
    width: '100%',
    minHeight: 500,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  picture: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    shadowColor: '#000',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    filter: 'blur(5px)',
  },
  chatBox: {
    flex: 1,
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 15,
  },
  medicenDetails: {
    gap: 25,
    marginTop: 5,
    marginHorizontal: 10,
  },
  genericName: {},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    fontWeight: 'semibold',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2475B0',
  },
  loader: {
    height: '100%',
    width: '100%',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

interface MedicineInfo {
  error: string | null;
  message: string | null;
  identification: {
    generic_name: string | null;
    brand_names: string[] | null;
    visual_clues: string | null;
  } | null;
  purpose: string | null;
  cost_in_INR: {
    generic: string | null;
    branded: string | null;
  } | null;
  usage: {
    dose: string | null;
    max_daily: string | null;
    avoid_if: string[] | null;
  } | null;
  safety: {
    common_side_effects: string[] | null;
    serious_risks: string[] | null;
    pregnancy_safety: string | null;
  } | null;
  alternatives:
    | {
        name: string | null;
        cost: string | null;
        use_case: string | null;
        warning: string | null;
      }[]
    | null;
  key_advice: {
    storage: string | null;
    interactions: string | null;
    otc_status: string | null;
  } | null;
}

export default DetailsLayout;
