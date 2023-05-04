import React from 'react';
import store from './src/store';
import AppNavigator from './src/router';
import {Provider} from "react-redux";


export default function App() {
//console.log('store:', store);
    return (

        <Provider store={store}>
            <AppNavigator/>
        </Provider>

    );
}
