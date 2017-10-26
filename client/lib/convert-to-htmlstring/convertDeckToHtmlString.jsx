// eslint-disable-next-line camelcase
import { html_beautify } from 'js-beautify';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';

import { store } from 'App';

import DeckDisplayWrapper from 'lib/ows-parts/deck/DeckDisplayWrapper';

function convertDeckToHtmlString(deck) {
  const htmlString = ReactDOMServer.renderToStaticMarkup((
    <Provider store={store}>
      <DeckDisplayWrapper
        deck={deck}
      />
    </Provider>
  ));

  return html_beautify(htmlString, { indent_size: 2 });
}

export default convertDeckToHtmlString;
