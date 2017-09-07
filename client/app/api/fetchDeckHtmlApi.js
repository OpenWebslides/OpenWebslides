import ApiRequest from './helpers/apiHelper';

async function fetchDeck(deckId) {
  const request = new ApiRequest();

  request.setMethod('GET').setEndpoint(`decks/${deckId}`).addHeader('Accept', 'text/html');

  const response = await request.executeRequest();

  const responseBody = await response.text();

  return responseBody;
}

export default fetchDeck;
