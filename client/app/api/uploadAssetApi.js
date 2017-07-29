import ApiRequest from './helpers/apiHelper';

async function uploadAssetApi(deckId, file) {
  const request = new ApiRequest();

  request
    .setEndpoint(`decks/${deckId}/assets`)
    .setMethod('POST')
    .addHeader('Content-Type', 'application/octet-stream')
    .addHeader('Content-Disposition', `attachment; filename="${file.name}"`)
    .setBody(file);

  return request.executeRequest();
}

export default uploadAssetApi;
