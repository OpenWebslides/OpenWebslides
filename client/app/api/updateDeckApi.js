import ApiRequest from './helpers/apiHelper';

async function updateDeck(deckId, HTMLString) {
  const request = new ApiRequest();

  request.setMethod('PATCH').setEndpoint(`decks/${deckId}`).addHeader('Content-Type', 'text/html').setBody(HTMLString);

  return request.executeRequest();
}

export default updateDeck;
