import ApiRequest from './helpers/apiHelper';

async function importDeck(file) {
  const request = new ApiRequest();

  request
    .setMethod('POST')
    .setEndpoint('api/conversion')
    .addHeader('Accept', 'application/vnd.api+json')
    .setSendFile(file);

  return request.executeRequest();
}

export default importDeck;
