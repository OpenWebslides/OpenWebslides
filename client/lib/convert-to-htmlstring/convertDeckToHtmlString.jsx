import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';

import { store } from 'App';

import DeckHtmlWrapper from './DeckHtmlWrapper';

function convertDeckToHtmlString(deck) {
  return ReactDOMServer.renderToStaticMarkup((
    <Provider store={store}>
      <DeckHtmlWrapper
        deck={deck}
      />
    </Provider>
  ));
}

export default convertDeckToHtmlString;
