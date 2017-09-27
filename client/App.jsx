import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import 'react-fine-uploader/gallery/gallery.css';

import routes from './routes';
import configureStore from './configureStore';
import i18n from './i18n';
import './assets/stylesheets/scss/application.scss';

import 'typeface-open-sans';
import 'typeface-ubuntu-mono'
import 'typeface-raleway'
import 'typeface-raleway-dots'

import 'font-awesome/fonts/FontAwesome.otf'
import 'font-awesome/fonts/fontawesome-webfont.eot'
import 'font-awesome/fonts/fontawesome-webfont.svg'
import 'font-awesome/fonts/fontawesome-webfont.ttf'
import 'font-awesome/fonts/fontawesome-webfont.woff'
import 'font-awesome/fonts/fontawesome-webfont.woff'

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
