import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Dimensions } from 'react-native';
import { Fonts } from '../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';
import { Camera } from 'expo-camera';

const RecognizerPage = () => {
  let [fontsLoaded] = useFonts(Fonts);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
        <Camera style={{ flex: 1 }} type={type}>
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
                    fontSize: 32
                  }}
                >
                  Lorem Ipsum
                </Text>
                <TouchableOpacity
                  onPress={() => {}}
                >
                  <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> Start Recording </Text>
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
        </Camera>
      </SafeAreaView>
    )
  }
}

export default RecognizerPage;