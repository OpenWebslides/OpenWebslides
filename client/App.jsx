import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import 'react-fine-uploader/gallery/gallery.css';

import routes from './routes';
import configureStore from './configureStore';
import i18n from './i18n';
import './assets/stylesheets/scss/application.scss';

import 'file-loader?name=index.html!index.html';

const store = configureStore();

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        {routes}
      </Provider>
    </I18nextProvider>
  );
}
