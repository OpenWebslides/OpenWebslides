import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root_reducer'
import rootSaga from './root_saga'
import { loadState, saveState } from './util/localStorage'

const persistedState = loadState()

// Enable redux-devtools
/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  persistedState,
  composeSetup(applyMiddleware(sagaMiddleware)))

// Persists state to localStorage
store.subscribe(() => {
  saveState({
    signin: store.getState().signin
  })
})

// Fire up root Saga
sagaMiddleware.run(rootSaga)

export default store
