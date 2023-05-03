import React from 'react';
import store from './src/store';
import AppNavigator from './src/router';


export default function App() {
//console.log('store:', store);
  return (

    <React.StrictMode store={store}>
        <AppNavigator/>
        </React.StrictMode>
    
  );
}
