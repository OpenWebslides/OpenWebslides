import ApiRequest from './helpers/apiHelper';

async function fetchDeck(deckId) {
  const request = new ApiRequest();

  request.setMethod('GET').setEndpoint(`decks/${deckId}?include=assets`);

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody;
}

export default fetchDeck;
