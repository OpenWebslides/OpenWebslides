import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { ADD_SLIDE, DELETE_SLIDE } from 'actions/entities/slides';
import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';

import { ADD_CONTENT_ITEM } from 'actions/entities/content-items';

const initialState = Immutable({});

function byId(state = initialState, action) {
  switch (action.type) {

    case ADD_SLIDE:
      return {
        ...state,
        [action.payload.slideId]: {
          id: action.payload.slideId,
          level: 0,
          contentItemIds: [],
          contentItemSequence: 0,
        },
      };

    case ADD_CONTENT_ITEM:
      return Immutable.merge(state, {
        [action.payload.slideId]: Immutable.merge(
          state[action.payload.slideId], {
            contentItemIds: state[action.payload.slideId].contentItemIds.concat(action.payload.contentItemId),
            contentItemSequence: state[action.payload.slideId].contentItemSequence + 1,
          },
        ),
      });

    case DELETE_SLIDE:
      return _.omit(state, action.payload.slideId);

    case FETCH_DECK_SUCCESS:
      return action.payload.slidesById;

    default:
      return state;
  }
}

export default byId;
