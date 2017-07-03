import ApiRequest from './helpers/apiHelper';

async function requestUserDecks(userID) {
  const request = new ApiRequest();

  request.setMethod('GET').setEndpoint(`users/${userID}/decks`);

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody.data;
}

export default requestUserDecks;
