import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
//import { configureStore } from '@reduxjs/toolkit';


import reducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// const store = configureStore({
//    reducer: reducer,
//    middleware: [applyMiddleware(sagaMiddleware)],
//    devTools: process.env.NODE_ENV !== 'production',
//  });

sagaMiddleware.run(rootSaga);

export default store;