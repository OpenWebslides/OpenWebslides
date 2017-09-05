import ApiRequest from './helpers/apiHelper';

async function requestUserImports(userID) {
  const request = new ApiRequest();

  request
    .setMethod('GET')
    .setEndpoint(`users/${userID}/conversions`)
    .addParameter('sort', '-createdAt');

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody.data;
}

export default requestUserImports;
