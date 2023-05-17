import React, {useEffect} from 'react';
import store from './src/store';
import AppNavigator from './src/router';
import {Provider} from "react-redux";
//import { showInterstitialAd } from './src/components/AdMob';
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
    useEffect(() => {
        (async function () {
            //await showInterstitialAd();
            await AsyncStorage.removeItem('alreadyLaunched');
        })();
    }, []);
    return (

        <Provider store={store}>
            <AppNavigator/>
        </Provider>

    );
}

export default App;