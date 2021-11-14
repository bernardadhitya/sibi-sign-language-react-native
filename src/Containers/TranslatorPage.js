import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { Fonts } from '../Constants/Fonts';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { ScrollView } from 'react-native';

const TranslatorPage = () => {
  let [fontsLoaded] = useFonts(Fonts);

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
          <Text>TranslatorPage</Text>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default TranslatorPage;