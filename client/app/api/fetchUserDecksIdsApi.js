import ApiRequest from './helpers/apiHelper';

async function fetchUserDecksIds(userId) {
  const request = new ApiRequest();

  request.setMethod('GET').setEndpoint(`users/${userId}/relationships/decks`);

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody;
}

export default fetchUserDecksIds;
