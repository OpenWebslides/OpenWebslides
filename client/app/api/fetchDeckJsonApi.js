import ApiRequest from './helpers/apiHelper';

async function fetchDeckJson(deckId, includeAssets = true) {
  const request = new ApiRequest();

  const endpoint = includeAssets ? `decks/${deckId}?include=assets` : `decks/${deckId}`;

  request.setMethod('GET').setEndpoint(endpoint);

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody;
}

export default fetchDeckJson;
