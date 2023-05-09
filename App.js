import React, {useEffect} from 'react';
import store from './src/store';
import AppNavigator from './src/router';
import {Provider} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { showInterstitialAd } from './src/components/AdMob';


function App() {
    useEffect(() => {
        (async function () {
            //await showInterstitialAd();
            await AsyncStorage.removeItem('alreadyLaunched');
            console.log('AsyncStorage.getItem(alreadyLaunched):', await AsyncStorage.getItem('alreadyLaunched'))
        })();
    }, []);
    return (

        <Provider store={store}>
            <AppNavigator/>
        </Provider>

    );
}

export default App;