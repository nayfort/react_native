import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import React from 'react';
import store from './src/store';
import { Asset } from 'expo-asset';
import AppNavigator from './src/router';
import { StyleSheet } from 'react-native-web';


export default function App() {
//console.log('store:', store);
  return (

    <React.StrictMode store={store}>
        <AppNavigator/>
    </React.StrictMode>
    
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
