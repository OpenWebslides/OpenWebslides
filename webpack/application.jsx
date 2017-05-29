import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { I18nextProvider } from 'react-i18next';

import routes from './routes';
import configureStore from './configureStore';
import i18n from './i18n';

const store = configureStore();

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>
  </I18nextProvider>,
  document.getElementById('main'),
);
