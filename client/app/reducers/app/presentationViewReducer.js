import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';


const initialState = Immutable({
  activeDeckId: null,
  activeSlideId: null,
});

function presentationView(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECK_SUCCESS: {
      const slides = _.values(action.payload.slidesById);

      return state.merge({
        activeDeckId: action.payload.deckId,
        activeSlideId: slides.length > 0 ? slides[0].id : null,
      });
    }

    default:
      return state;
  }
}

export default presentationView;
