import { createSelector } from 'reselect';
import _ from 'lodash';

export const getActiveSlideId = state => state.app.presentationView.activeSlideId;
export const getConversationsById = state => state.entities.conversations.byId;
export const getConversationById = (state, conversationId) => state.entities.conversations.byId[conversationId];

const getConversationsForActiveSlide = createSelector(
  getActiveSlideId,
  getConversationsById,
  (activeSlideId, conversations) => {
    return _.filter(conversations, { contentItemId: activeSlideId });
  },
);

export default getConversationsForActiveSlide;
