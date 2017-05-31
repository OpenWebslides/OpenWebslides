import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';

import rootReducer from 'reducers/rootReducer';
import rootSaga from 'sagas/rootSaga';
import { loadState, saveState } from './localStorage';

// Enable redux-devtools
/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

function configureStore() {
  const persistedState = loadState();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    persistedState,
    composeSetup(applyMiddleware(sagaMiddleware)),
  );

  // Persists state to localStorage
  store.subscribe(throttle(() => {
    saveState({
      local: {
        auth: store.getState().local.auth,
      },
      data: {
        activeDeck: store.getState().data.activeDeck,
      },
    });
  }, 1000));

  // Fire up root Saga
  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
