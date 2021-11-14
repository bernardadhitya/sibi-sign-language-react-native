import React, { useEffect, useState, useRef } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Dimensions } from 'react-native';
import { Fonts } from '../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

const RecognizerPage = () => {
  let [fontsLoaded] = useFonts(Fonts);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recording, setRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState([]);

  const cameraRef = useRef(null);

  const service = 'http://df84-35-188-243-114.ngrok.io/';

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
                height: 200,
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'white'
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: Dimensions.get('window').width,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    marginVertical: 32,
                    fontSize: 32
                  }}
                >
                  {recognizedText.join('')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {setRecording(!!!recording)}}
                  >
                    {
                      recording ? <Text style={{ fontSize: 18, marginBottom: 10, color: 'red' }}>
                        Stop Recording
                      </Text> : <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                        Start Recording
                      </Text>
                    }
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> Flip </Text>
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