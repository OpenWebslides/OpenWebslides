import Immutable from 'seamless-immutable';

import { FETCH_SLIDES_SUCCESS } from 'actions/fetchSlidesActions';
import { ADD_SLIDE, SELECT_SLIDE } from 'actions/slideActions';
import { UPDATE_CONTENT_BLOCK } from 'actions/updateContentBlockActions';

const initialState = {};

function setActiveDeck(state = initialState, action) {
  switch (action.type) {
    case FETCH_SLIDES_SUCCESS:
      return Immutable.merge(state, action.payload);

    case UPDATE_CONTENT_BLOCK:
      return Immutable.merge(state);

    case SELECT_SLIDE:
      return Immutable.merge(
        state,
        {
          slides: {
            selectedSlide: action.payload.selectedSlideId,
          },
        },
        { deep: true },
      );

    case ADD_SLIDE:
      return Immutable.merge(
        state,
        {
          slides: {
            allIds: state.slides.allIds.concat(action.payload.newSlideId),
            selectedSlide: action.payload.newSlideId,
            byId: {
              [action.payload.newSlideId]: {
                id: action.payload.newSlideId,
                contentBlocks: [],
              },
            },
          },
        },
        { deep: true },
      );

    default:
      return state;
  }
}

export default setActiveDeck;
