import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import RecognizerPage from './src/Containers/RecognizerPage';
import { TabView, SceneMap } from 'react-native-tab-view';
import TranslatorPage from './src/Containers/TranslatorPage';
import { NavigationContainer } from '@react-navigation/native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Recognizer" component={RecognizerPage} />
        <Tab.Screen name="Translator" component={TranslatorPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
