import ApiRequest from './helpers/apiHelper';

async function uploadAssetApi(deckId, file) {
  const request = new ApiRequest();

  request
    .setEndpoint(`decks/${deckId}/assets`)
    .setMethod('POST')
    .addHeader('Content-Type', `${file.type}`)
    .addHeader('Content-Disposition', `attachment; filename="${file.name}"`)
    .setBody(file);

  const response = await request.executeRequest();
  const responseBody = await response.json();

  return responseBody.data;
}

export default uploadAssetApi;
