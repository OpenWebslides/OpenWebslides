import ApiRequest from './helpers/apiHelper';

async function uploadAssetApi({ conversationCommentId, text }) {
  const request = new ApiRequest();

  request
    .setEndpoint(`comments/${conversationCommentId}`)
    .setMethod('PATCH')
    .setBody({
      data: {
        type: 'comments',
        id: conversationCommentId,
        attributes: {
          text,
        },
      },
    });

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody;
}

export default uploadAssetApi;
