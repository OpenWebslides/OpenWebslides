import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { FETCH_DECK_SUCCESS } from 'actions/deckActions';
import { ADD_SLIDE, DELETE_SLIDE } from 'actions/slideActions';

const initialState = Immutable({});

function byId(state = initialState, action) {
  let deckId;
  let deck;

  switch (action.type) {

    case FETCH_DECK_SUCCESS:
      deckId = action.payload.activeDeckId;

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

    case ADD_SLIDE:
      deckId = action.payload.deckId;
      deck = state[deckId];

      return Immutable.merge(
        state,
        {
          [deckId]: Immutable.merge(
            deck,
            {
              slideIds: [
                ...deck.slideIds,
                action.payload.slideId,
              ],
              slideSequence: deck.slideSequence + 1,
            }
          ),
        },
      );

    case DELETE_SLIDE:
      deckId = action.payload.deckId;
      deck = state[deckId];

      return Immutable.merge(
        state,
        {
          [deckId]: Immutable.merge(
            deck,
            {
              slideIds: _.without(deck.slideIds, action.payload.slideId),
              sideSequence: deck.slideSequence + 1,
            }
          ),
        },
      );

    default:
      return state;
  }
}

export default byId;
