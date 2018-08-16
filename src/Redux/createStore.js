import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { offline } from 'redux-offline';
// import offlineConfig from 'redux-offline/lib/defaults';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from '../Reducers';
import rootSaga from '../Sagas'; // TODO: Next step
import Reactotron from 'reactotron-react-native'

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['nav'], // navigation will not be persisted
//   // whitelist: ['nav'], // only navigation will be persisted
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)
  
//  Returns the store instance
// It can  also take initialState argument when provided
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...Reactotron.createStore(rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      // offline(offlineConfig)
    )),
    runSaga: sagaMiddleware.run(rootSaga) 
  };

  // let store = createStore(persistedReducer)
  // let persistor = persistStore(store)
  // return {
  //   ...createStore(persistedReducer,
  //   compose(
  //     applyMiddleware(sagaMiddleware),
  //     // persistStore(persistConfig),
  //     // offline(offlineConfig)
  //   )),
  //   runSaga: sagaMiddleware.run(rootSaga),
  //   persistor 
  // };
};

export default configureStore;
