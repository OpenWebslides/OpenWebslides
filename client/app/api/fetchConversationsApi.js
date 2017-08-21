import ApiRequest from './helpers/apiHelper';

async function fetchConversations(deckId) {
  const request = new ApiRequest();

  request.setMethod('GET').setEndpoint(`decks/${deckId}/conversations?include=user`);

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody;
}

export default fetchConversations;
