import ApiRequest from './helpers/apiHelper';

async function fetchDeckJson(deckId, inclusions) {
  const request = new ApiRequest();

  const { assets, collaborators, user, conversations } = inclusions;

  const endpoint = `decks/${deckId}`;

  request.setMethod('GET').setEndpoint(endpoint);

  if (assets || collaborators || user || conversations) {
    let param = '';

    if (assets) {
      param = `${param}assets,`;
    }
    if (collaborators) {
      param = `${param}collaborators,`;
    }
    if (user) {
      param = `${param}user,`;
    }
    if (conversations) {
      param = `${param}conversations,`;
    }
    // remove trailing comma
    param = param.substring(0, param.length);
    request.addParameter('include', param);
  }

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody;
}

export default fetchDeckJson;
