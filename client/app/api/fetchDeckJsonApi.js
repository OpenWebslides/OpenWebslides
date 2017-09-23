import ApiRequest from './helpers/apiHelper';

async function fetchDeckJson(deckId, inclusions) {
  const request = new ApiRequest();

  const { assets, collaborators, owner, conversations } = inclusions;

  const endpoint = `decks/${deckId}`;

  request.setMethod('GET').setEndpoint(endpoint);

  if (assets || collaborators || owner || conversations) {
    let param = '';

    if (assets) {
      param = `${param}assets,`;
    }
    if (collaborators) {
      param = `${param}collaborators,`;
    }
    if (owner) {
      param = `${param}owner,`;
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
