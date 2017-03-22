import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import IndexReducer from './index_reducer';
import IndexSagas from './index_sagas';

// Enables Redux Dev Tools
/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware))); // allows redux devtools to watch sagas

sagaMiddleware.run(IndexSagas);

export default store;
