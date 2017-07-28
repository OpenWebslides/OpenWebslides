import ApiRequest from './helpers/apiHelper';

async function uploadAssetApi(deckId, file, filename) {
  const request = new ApiRequest();

  request.setEndpoint(`deck/${deckId}/assets`).setMethod('POST').setBody(file);

  return request.executeRequest();
}

export default uploadAssetApi;
