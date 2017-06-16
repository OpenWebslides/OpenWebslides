import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

export const DECK_DELETION_URL = 'http://localhost:3000/api/decks/';

async function deleteDeck(deckId, token) {
  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  });
  return asyncFetch(DECK_DELETION_URL + deckId, requestConfig);
}

export default deleteDeck;
