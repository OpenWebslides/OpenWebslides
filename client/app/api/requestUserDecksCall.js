import ApiRequest from './helpers/apiHelper';

async function requestUserDecks(userID) {
  const request = new ApiRequest();

  request.setMethod('GET').setEndpoint(`users/${userID}/decks`);

  const response = await request.executeRequest();

  const responseBody = await response.json();
  const newToken = response.headers.get('Authorization');

  return { responseListOfDecks: responseBody.data, newToken };
}

export default requestUserDecks;
