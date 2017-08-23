import ApiRequest from './helpers/apiHelper';

async function createConversationComment({ contentItemId, text, conversationId, deckId, userId }) {
  const request = new ApiRequest();

  console.log(contentItemId, text, conversationId, deckId, userId);

  const requestBody = {
    data: {
      type: 'comments',
      attributes: {
        contentItemId,
        text,
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
        conversation: {
          data: {
            id: conversationId,
            type: 'conversations',
          },
        },
      },
    },
  };

  request.setMethod('POST').setEndpoint('comments').setBody(requestBody);

  const response = await request.executeRequest();

  return response;
}

export default createConversationComment;
