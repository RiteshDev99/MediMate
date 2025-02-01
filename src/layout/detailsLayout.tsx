import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, Text, ScrollView} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {scannerPrompt} from '../Utils/scannerPrompt.ts';

const genAI = new GoogleGenerativeAI('AIzaSyBkRZG5Jy1nF5ioYVhcRaoV9zfdnANi4BI'); // Use environment variable

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
        console.error('Error sending image to Gemini:', error);
        // setGeminiResponse('Failed to get response from Gemini.' + error);
      }
    };

    if (route?.params?.capturedImage) {
      setCameraImage(route.params.capturedImage);
      sendImageToGemini(route.params.capturedImage);
    }
  }, [route?.params?.capturedImage]);
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
        <View style={styles.chatBox}>
          <View style={styles.medicenDetails}>
            <View style={styles.genericName}>
              <Text style={styles.title}>Generic Name : </Text>
              <Text style={styles.desc}>
                {geminiResponse?.identification.generic_name}
              </Text>
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Brand Name : </Text>
              <Text style={styles.desc}>
                {geminiResponse?.identification.brand_names}
              </Text>
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>VisualClues : </Text>
              <Text style={styles.desc}>
                {geminiResponse?.identification.visual_clues}
              </Text>
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Generic : </Text>
              <Text style={styles.desc}>
                {geminiResponse?.cost_in_INR.generic}
              </Text>
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Branded : </Text>
              <Text style={styles.desc}>
                {geminiResponse?.cost_in_INR.branded}
              </Text>
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Dose : </Text>
              <Text style={styles.desc}>{geminiResponse?.usage.dose}</Text>
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Avoid_If : </Text>
              <Text style={styles.desc}>{geminiResponse?.usage.avoid_if}</Text>
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Max_Daily : </Text>
              <Text style={styles.desc}>{geminiResponse?.usage.max_daily}</Text>
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Serious_Risks : </Text>
              <Text style={styles.desc}>
                {geminiResponse?.safety.serious_risks}
              </Text>
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Name : </Text>
              {geminiResponse?.alternatives.map(data => (
                <Text style={styles.desc}>{data.name}</Text>
              ))}
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Cost : </Text>
              {geminiResponse?.alternatives.map(data => (
                <Text style={styles.desc}>{data.cost}</Text>
              ))}
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Use Case : </Text>
              {geminiResponse?.alternatives.map(data => (
                <Text style={styles.desc}>{data.use_case}</Text>
              ))}
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Warning : </Text>
              {geminiResponse?.alternatives.map(data => (
                <Text style={styles.desc}>{data.warning}</Text>
              ))}
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Interactions : </Text>
              <Text style={styles.desc}>
                {geminiResponse?.key_advice.interactions}
              </Text>
            </View>
            <View style={styles.genericName}>
              <Text style={styles.title}>Storage : </Text>
              <Text style={styles.desc}>
                {geminiResponse?.key_advice.storage}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#c3d9d9',
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
    gap: 5,
  },
  genericName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    fontWeight: 'semibold',
  },
});

interface MedicineInfo {
  identification: {
    generic_name: string;
    brand_names: string[];
    visual_clues: string;
  };
  purpose: string;
  cost_in_INR: {
    generic: string;
    branded: string;
  };
  usage: {
    dose: string;
    max_daily: string;
    avoid_if: string[];
  };
  safety: {
    common_side_effects: string[];
    serious_risks: string[];
    pregnancy_safety: string;
  };
  alternatives: {
    name: string;
    cost: string;
    use_case: string;
    warning: string;
  }[];
  key_advice: {
    storage: string;
    interactions: string;
    otc_status: string;
  };
}

export default DetailsLayout;
