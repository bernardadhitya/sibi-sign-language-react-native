import React, { useEffect, useState, useRef } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Dimensions } from 'react-native';
import { Fonts } from '../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import IconFlip from '../Assets/icons/IconFlip';

const RecognizerPage = () => {
  let [fontsLoaded] = useFonts(Fonts);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recording, setRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState([]);

  const cameraRef = useRef(null);

  const service = 'http://2cfc-35-188-243-114.ngrok.io/';

  const handleRecognizedWord = (word) => {
    setRecognizedText(prevText => {
      if (prevText[prevText.length - 1] !== word){
        return [...prevText, word]
      } else {
        return prevText
      }
    });
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!!!recording) {
        console.log('==============');
        console.log('recording is off');
        return;
      }
      const photo = await cameraRef.current.takePictureAsync({quality: 0.5, exif: false});

      let formData = new FormData();
      formData.append('file', {
        uri: photo.uri,
        name: 'image.jpg',
        type: 'image/jpg'
      });

      const result = await axios.post(`${service}predict`, formData); //do API call here
      console.log('==============')
      console.log('prediction result:', result.data);

      handleRecognizedWord(result.data);
    }, 5000);
    return () => clearInterval(interval);
  }, [recording]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (recording){
    console.log("recognizedText:", recognizedText);
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return ( 
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          <View
            style={{
              width: Dimensions.get('window').width,
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                height: 250,
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: Dimensions.get('window').width,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingVertical: 18
                  }}
                  onPress={() => {setRecognizedText([])}}
                >
                  <Text
                    style={{
                      margin: 18,
                      fontFamily: 'Bold',
                      textAlign: 'center',
                      color: 'gray'
                    }}
                  >
                    { recognizedText.length > 0 ? 'Hasil Terjemahan' : ''}
                  </Text>
                  <Text
                    style={{
                      marginBottom: 32,
                      textAlign: 'center',
                      fontSize: recognizedText.length > 0 ? 32 : 18,
                      fontFamily: 'Bold',
                      color: recognizedText.length > 0 ? 'black' : 'gray'
                    }}
                  >
                    {
                      recognizedText.length > 0 ?
                        recognizedText.join('') :
                        "Tekan 'Rekam' untuk mulai"
                    }
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: Dimensions.get('window').width,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {setRecording(!!!recording)}}
                  >
                    <View
                      style={{
                        height: 70,
                        width: 70,
                        backgroundColor: 'red',
                        borderRadius: 35,
                        borderWidth: `${ recording ? 5 : 20 }`,
                        borderColor: 'white',
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 30
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                      }}
                    >
                      <IconFlip/>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Camera>
      </SafeAreaView>
    )
  }
}

export default RecognizerPage;