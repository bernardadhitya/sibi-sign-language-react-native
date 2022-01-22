import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Fonts } from '../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { images } from '../Constants/Images';

const TranslatorPage = () => {
  let [fontsLoaded] = useFonts(Fonts);
  const [text, setText] = useState("");
  const [playing, setPlaying] = useState(false);
  const [counterPlayed, setCounterPlayed] = useState(0);

  const renderTranslationCards = () => {
    return text.split('').map((letter, idx) => {
      const imageUrl = images[letter.toUpperCase()];
      return (
        <View
          key={idx}
          style={{
            width: 200,
            height: 220,
            margin: 20,
            borderRadius: 10,
            backgroundColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            style={{
              width: 150,
              height: 150,
              resizeMode: 'stretch',
              marginBottom: 18
            }}
            source={imageUrl}
          />
          <Text
            style={{
              fontFamily: 'Bold',
              fontSize: 24
            }}
          >
            {letter.toUpperCase()}
          </Text>
        </View>
      )
    })
  }

  const renderTranslationSlideShow = () => {
    const imageUrl = images[text.split('')[counterPlayed % text.length].toUpperCase()];
    return (
      <View
        style={{
          width: 200,
          height: 220,
          margin: 20,
          borderRadius: 10,
          backgroundColor: 'white',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          style={{
            width: 150,
            height: 150,
            resizeMode: 'stretch',
            marginBottom: 18
          }}
          source={imageUrl}
        />
        <Text
          style={{
            fontFamily: 'Bold',
            fontSize: 24
          }}
        >
          {text.split('')[counterPlayed % text.length].toUpperCase()}
        </Text>
      </View>
    )
  }
  
  useEffect(() => {
    const intervalID = setTimeout(() =>  {
      console.log('==============');
      console.log('currently playing... counter at ' + counterPlayed);
      console.log('length of text:', text.length);
      if (counterPlayed >= text.length-1) {
        setPlaying(false);
      } else {
        setCounterPlayed(counterPlayed+1)
      }
    }, 2000);

    return () => clearInterval(intervalID);
  }, [counterPlayed, playing]);

  const renderTranslationSlider = () => {
    return (
      <View style={{ alignItems: "center"}}>
        {
          playing ?
          <>{ renderTranslationSlideShow() }</> :
          <ScrollView horizontal>
            { renderTranslationCards() }
          </ScrollView>
        }
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            paddingTop: 16,
            paddingHorizontal: 32,
            borderRadius: 32,
            width: '50%'
          }}
          onPress={() => {setCounterPlayed(0); setPlaying(!playing)}}
        >
          <Text
            style={{
              fontFamily: 'Medium',
              fontSize: 18,
              marginBottom: 18,
              textAlign: 'center',
              color: playing ? 'red' : 'black'
            }}
          >
            {playing ? 'Stop' : 'Play'}
          </Text>
        </TouchableOpacity>
      </View>
    )
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
        <ScrollView>
          <View
            style={{
              marginTop: 80,
              marginHorizontal: 30
            }}
          >
            <Text
              style={{
                fontFamily: 'Bold',
                fontSize: 24,
                marginBottom: 18
              }}
            >
              Penerjemah
            </Text>
            <Text
              style={{
                fontFamily: 'Regular',
                fontSize: 16,
                marginBottom: 18
              }}
            >
              Tulis kata yang ingin kamu terjemahkan ke bahasa isyarat
            </Text>
            <TextInput
              style={{
                height: 40,
                marginBottom: 18,
                padding: 10,
                borderRadius: 10,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3
              }}
              onChangeText={setText}
              value={text}
              placeholder='Tulis kata disini'
            />
          </View>
          <View
            style={{
              marginTop: 40,
              marginHorizontal: 30
            }}
          >
            <Text
              style={{
                fontFamily: 'Bold',
                fontSize: 18,
                marginBottom: 18
              }}
            >
              Hasil terjemahan
            </Text>
            { text.length > 0 ? renderTranslationSlider() : <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  fontFamily: 'Bold',
                  fontSize: 20,
                  marginTop: 64,
                  textAlign: 'center',
                  color: 'gray'
                }}
              >
                Tulis kata yang ingin kamu terjemahkan
              </Text>
            </View> }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default TranslatorPage;