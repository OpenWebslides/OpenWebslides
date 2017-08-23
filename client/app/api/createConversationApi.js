import ApiRequest from './helpers/apiHelper';

async function createConversation({ contentItemId, title, text, conversationType, deckId, userId }) {
  const request = new ApiRequest();

  const requestBody = {
    data: {
      type: 'conversations',
      attributes: {
        contentItemId,
        title,
        text,
        conversationType,
      },
      relationships: {
        deck: {
          data: {
            id: deckId,
            type: 'decks',
          },
        },
        user: {
          data: {
            id: userId,
            type: 'users',
          },
        },
      },
    },
  };

  request.setMethod('POST').setEndpoint('conversations').setBody(requestBody);

  const response = await request.executeRequest();

  return response;
}

export default createConversation;
