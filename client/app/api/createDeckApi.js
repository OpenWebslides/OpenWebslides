import ApiRequest from './helpers/apiHelper';

async function createDeck(title, description, authorID, token) {
  const request = new ApiRequest();

  const requestBody = {
    data: {
      type: 'decks',
      attributes: {
        name: title,
        description,
      },
      relationships: {
        owner: {
          data: {
            id: authorID,
            type: 'users',
          },
        },
      },
    },
  };

  request
    .setMethod('POST')
    .setEndpoint('decks')
    .addHeader('Accept', 'application/vnd.api+json')
    .setBody(requestBody);

  return request.executeRequest();
}

export default createDeck;
