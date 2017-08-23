import ApiRequest from './helpers/apiHelper';

async function deleteConversation(conversationId) {
  const request = new ApiRequest();

  request
    .setMethod('DELETE')
    .setEndpoint(`conversations/${conversationId}`)
    .addHeader('Accept', 'application/vnd.api+json');

  return request.executeRequest();
}

export default deleteConversation;
