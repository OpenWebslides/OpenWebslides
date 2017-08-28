import ApiRequest from './helpers/apiHelper';

async function rateConversationComment(conversationCommentId) {
  const request = new ApiRequest();

  request
    .setMethod('POST')
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

export default rateConversationComment;
