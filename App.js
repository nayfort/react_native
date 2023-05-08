import React, {useEffect} from 'react';
import store from './src/store';
import AppNavigator from './src/router';
import {Provider} from "react-redux";
import { showInterstitialAd } from './src/components/AdMob';


function App() {
    useEffect(() => {
        (async function () {
            await showInterstitialAd();
        })();
    }, []);
    return (

        <Provider store={store}>
            <AppNavigator/>
        </Provider>

    );
}

export default App;