import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from 'reducers/rootReducer';
import rootSaga from 'sagas/rootSaga';
import { loadState, saveState } from 'helpers/localStorage';

const persistedState = loadState();

// Enable redux-devtools
/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

// middleware
const sagaMiddleware = createSagaMiddleware();
const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  rootReducer,
  persistedState,
  composeSetup(applyMiddleware(sagaMiddleware, routingMiddleware)));

// Persists state to localStorage
store.subscribe(() => {
  saveState({
    local: {
      auth: store.getState().local.auth,
    },
  });
});

// Fire up root Saga
sagaMiddleware.run(rootSaga);

export default store;
