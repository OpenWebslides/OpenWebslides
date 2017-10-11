import Immutable from 'seamless-immutable';

import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';
import {
  VIEW_FIRST_SLIDE,
  VIEW_LAST_SLIDE,
  VIEW_PREVIOUS_SLIDE,
  VIEW_NEXT_SLIDE,
  SET_ACTIVE_SLIDE,
} from 'actions/app/presentation-view';


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

    case VIEW_FIRST_SLIDE: {
      const firstSlideId = state.slideIds[0];

      return state.merge({
        activeSlideId: firstSlideId,
      });
    }

    case SET_ACTIVE_SLIDE: {
      return state.merge({
        activeSlideId: action.payload.slideId,
      });
    }

    case VIEW_LAST_SLIDE: {
      const length = state.slideIds.length;
      const lastSlideId = state.slideIds[length - 1];

      return state.merge({
        activeSlideId: lastSlideId,
      });
    }

    case VIEW_PREVIOUS_SLIDE: {
      const currentSlideIndex = state.slideIds.indexOf(state.activeSlideId);
      const previousSlideId = state.slideIds[currentSlideIndex - 1] || state.activeSlideId;

      return state.merge({
        activeSlideId: previousSlideId,
      });
    }

    case VIEW_NEXT_SLIDE: {
      const currentSlideIndex = state.slideIds.indexOf(state.activeSlideId);
      const nextSlideId = state.slideIds[currentSlideIndex + 1] || state.activeSlideId;

      return state.merge({
        activeSlideId: nextSlideId,
      });
    }

    default:
      return state;
  }
}

export default presentationView;
