import ApiRequest from './helpers/apiHelper';

async function rateConversation(conversationId) {
  const request = new ApiRequest();

  request
    .setMethod('POST')
    .setEndpoint(`conversations/${conversationId}/rating`)
    .setBody({
      data: {
        type: 'ratings',
      },
    });

  const response = await request.executeRequest();
  const responseBody = await response.json();

  return responseBody.data;
}

export default rateConversation;
