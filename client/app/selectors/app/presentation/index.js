import _ from 'lodash';
import { createSelector } from 'reselect';
import { getSlideIdsById } from 'selectors/entities/decks';

export const getActiveSlideId = (state) => {
  return state.app.presentationView.activeSlideId;
};

export const getNumberOfActiveSlideInPresentation = createSelector(
  getActiveSlideId,
  getSlideIdsById,
  (activeSlideId, slideIds) => {
    const slideIndexInDeck = _.indexOf(slideIds, activeSlideId);

    return slideIndexInDeck + 1;
  },
);
