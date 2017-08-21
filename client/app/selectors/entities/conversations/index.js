import { createSelector } from 'reselect';
import _ from 'lodash';


const getActiveSlideId = state => state.app.presentationView.activeSlideId;
const getConversationsById = state => state.entities.conversations.byId;

const getConversationsForActiveSlide = createSelector(
  getActiveSlideId,
  getConversationsById,
  (activeSlideId, conversations) => {
    return _.filter(conversations, { contentItemId: '4' });
  },
);

export default getConversationsForActiveSlide;
