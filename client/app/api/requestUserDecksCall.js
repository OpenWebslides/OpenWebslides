import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

async function requestUserDecks(userID) {
  const USER_DECKS_URL = `http://localhost:3000/api/users/${userID}/decks`;

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'GET',
  });

  const response = await asyncFetch(USER_DECKS_URL, requestConfig);
  const responseBody = await response.json();

  return responseBody.data;
}

export default requestUserDecks;
