import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';

import { I18nextProvider } from 'react-i18next';

import routes from './routes';
import configureStore from './configureStore';
import i18n from './i18n';
import './assets/stylesheets/scss/application.scss';

const store = configureStore();

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>
    </I18nextProvider>
  );
}

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('react-container'),
  );
}

render(App);

if (module.hot) {
  module.hot.accept(App, () => {
    render(App);
  });
}
