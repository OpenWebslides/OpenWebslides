import Immutable from 'seamless-immutable';

import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';
import { CHANGE_SLIDE } from 'actions/app/presentation-view';


const initialState = Immutable({
  activeDeckId: null,
  activeSlideId: null,
  slideIds: [],
});

function presentationView(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECK_SUCCESS: {
      const slideIds = Object.keys(action.payload.slidesById);

      return state.merge({
        activeDeckId: action.payload.deckId,
        activeSlideId: slideIds.length > 0 ? slideIds[0] : null,
        slideIds,
      });
    }

    case CHANGE_SLIDE: {
      const currentSlideIndex = state.slideIds.indexOf(state.activeSlideId);
      const nextSlideId = state.slideIds[currentSlideIndex + action.payload.change] || currentSlideIndex;

      return state.merge({
        activeSlideId: nextSlideId,
      });
    }

    default:
      return state;
  }
}

export default presentationView;
