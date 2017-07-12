import _ from 'lodash';

import {
  ADD_SLIDE,
  DELETE_SLIDE,
} from 'actions/slideActions';
import { FETCH_DECK_SUCCESS } from 'actions/deckActions';

import { ADD_CONTENT_BLOCK } from 'actions/contentBlockActions';

const initialState = {};

function byId(state = initialState, action) {
  switch (action.type) {
    case ADD_SLIDE:
      return {
        ...state,
        [action.payload.slideSequence]: {
          content: [],
        },
      };

    case DELETE_SLIDE:
      return _.omit(state, action.payload.slideId);

    case FETCH_DECK_SUCCESS:
      return action.payload.slides;
    default:
      return state;
  }
}

export default byId;
