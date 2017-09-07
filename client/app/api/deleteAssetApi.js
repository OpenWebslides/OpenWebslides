import ApiRequest from './helpers/apiHelper';

async function deleteDeck(assetId) {
  const request = new ApiRequest();

  request
    .setMethod('DELETE')
    .setEndpoint(`assets/${assetId}`)
    .addHeader('Accept', 'application/vnd.api+json');

  return request.executeRequest();
}

export default deleteDeck;
