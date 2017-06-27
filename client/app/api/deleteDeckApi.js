import ApiRequest from './helpers/apiHelper';

async function deleteDeck(deckId) {
  const request = new ApiRequest();

  request
    .setMethod('DELETE')
    .setEndPoint(`api/decks/${deckId}`)
    .addHeader('Accept', 'application/vnd.api+json');

  return request.executeRequest();
}

export default deleteDeck;
