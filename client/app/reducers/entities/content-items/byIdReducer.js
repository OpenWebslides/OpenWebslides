import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { UPDATE_SLIDE } from 'actions/slideActions';
import { FETCH_DECK_SUCCESS } from 'actions/deckActions';
import {
  ADD_CONTENT_BLOCK,
  DELETE_CONTENT_BLOCKS,
} from 'actions/contentBlockActions';

const initialState = Immutable({});

function byId(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECK_SUCCESS:
      return action.payload.contentItems;

    default:
      return state;
  }
}

export default byId;
