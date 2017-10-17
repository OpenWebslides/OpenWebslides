// eslint-disable-next-line camelcase
import { html_beautify } from 'js-beautify';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';

import { store } from 'App';

import DeckHtmlWrapper from './DeckHtmlWrapper';

function convertDeckToHtmlString(deck) {
  const htmlString = ReactDOMServer.renderToStaticMarkup((
    <Provider store={store}>
      <DeckHtmlWrapper
        deck={deck}
      />
    </Provider>
  ));

  return html_beautify(htmlString);
}

export default convertDeckToHtmlString;
