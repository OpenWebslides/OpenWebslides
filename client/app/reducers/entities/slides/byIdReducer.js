import _ from 'lodash';

import {
  FETCH_SLIDES_SUCCESS,
  ADD_SLIDE,
  DELETE_SLIDE,
} from 'actions/slideActions';
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

    case ADD_CONTENT_BLOCK:
      return {
        ...state,
        [action.payload.slideId]: {
          content: state[action.payload.slideId].content.concat({
            id: action.payload.contentBlockId,
            type: 'contentBlock',
          }),
        },
      };

    case FETCH_SLIDES_SUCCESS:
      return action.payload.slides;
    default:
      return state;
  }
}

export default byId;
