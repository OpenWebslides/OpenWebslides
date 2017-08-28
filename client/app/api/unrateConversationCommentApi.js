import ApiRequest from './helpers/apiHelper';

async function unrateConversationComment(conversationCommentId) {
  const request = new ApiRequest();

  request
    .setMethod('DELETE')
    .setEndpoint(`comments/${conversationCommentId}/rating`)
    .setBody({
      data: {
        type: 'ratings',
      },
    });

  const response = await request.executeRequest();
  const responseBody = await response.json();

  return responseBody.data;
}

export default unrateConversationComment;
