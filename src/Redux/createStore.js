import { applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../Reducers';
import rootSaga from '../Sagas'; // TODO: Next step
import Reactotron from 'reactotron-react-native'

//  Returns the store instance
// It can  also take initialState argument when provided
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...Reactotron.createStore(rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
    )),
    runSaga: sagaMiddleware.run(rootSaga) 
  };
};

export default configureStore;
