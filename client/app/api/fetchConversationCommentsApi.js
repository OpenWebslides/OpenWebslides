import ApiRequest from './helpers/apiHelper';

async function fetchConversationComments(conversationId) {
  const request = new ApiRequest();

  request.setMethod('GET').setEndpoint(`conversations/${conversationId}/comments?include=user`);

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody;
}

export default fetchConversationComments;
