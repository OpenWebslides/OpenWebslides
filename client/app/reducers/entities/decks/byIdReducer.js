import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { ADD_SLIDE, DELETE_SLIDE } from 'actions/entities/slides';
import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';

const initialState = Immutable({});

function byId(state = initialState, action) {
  let deck;

  switch (action.type) {

    case ADD_SLIDE:
      deck = state[action.payload.deckId];

      return Immutable.merge(
        state,
        {
          [deck.id]: {
            slideIds: deck.slideIds.concat(action.payload.slideId),
            slideSequence: deck.slideSequence + 1,
          },
        },
        { deep: true},
      );

    case DELETE_SLIDE:
      deck = state[action.payload.deckId];

      return Immutable.merge(
        state,
        {
          [deck.id]: {
            slideIds: _.without(deck.slideIds, action.payload.slideId),
          },
        },
        { deep: true },
      );

    case FETCH_DECK_SUCCESS:
      const deckId = action.payload.activeDeckId;

      return Immutable.merge(
        state,
        {
          [deckId]: {
            id: deckId,
            meta: {},
            slideIds: Object.keys(action.payload.slidesById),
            slideSequence: Object.keys(action.payload.slidesById).length,
          },
        },
      );

    default:
      return state;
  }
}

export default byId;
