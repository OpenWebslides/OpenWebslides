import ApiRequest from './helpers/apiHelper';

async function uploadAssetApi({ conversationId, text, title, conversationType }) {
  const request = new ApiRequest();

  request
    .setEndpoint(`conversations/${conversationId}`)
    .setMethod('PATCH')
    .setBody({
      data: {
        type: 'conversations',
        id: conversationId,
        attributes: {
          text,
          title,
          conversationType,
        },
      },
    });

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody;
}

export default uploadAssetApi;
