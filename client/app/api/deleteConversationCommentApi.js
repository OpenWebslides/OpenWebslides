import ApiRequest from './helpers/apiHelper';

async function deleteConversationComment(conversationCommentId) {
  const request = new ApiRequest();

  request
    .setMethod('DELETE')
    .setEndpoint(`comments/${conversationCommentId}`)
    .addHeader('Accept', 'application/vnd.api+json');

  return request.executeRequest();
}

export default deleteConversationComment;
