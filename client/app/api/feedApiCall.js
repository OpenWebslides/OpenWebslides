import ApiRequest from './helpers/apiHelper';

async function requestFeedNotifications(offset = 0) {
  const request = new ApiRequest();

  request
    .setHost('localhost')
    .setPort(5000)
    .setEndpoint('api/notifications')
    .setMethod('GET')
    .addParameter('sort', '-createdAt')
    .addParameter('page[offset]', `${offset}`);

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody.data;
}

export default requestFeedNotifications;
