import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { ADD_SLIDE, UPDATE_SLIDE, DELETE_SLIDE } from 'actions/entities/slides';
import { ADD_CONTENT_ITEM, DELETE_CONTENT_ITEM } from 'actions/entities/content-items';
import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';

const initialState = Immutable({});

function byId(state = initialState, action) {
  let slide;

  switch (action.type) {

    case ADD_SLIDE:
      const slideId = action.payload.slideId;

      return Immutable.merge(
        state,
        {
          [slideId]: {
            id: slideId,
            level: 0,
            contentItemIds: [],
            contentItemSequence: 0,
          },
        },
      );

    case UPDATE_SLIDE:
      slide = state[action.payload.slideId];

      return Immutable.merge(
        state,
        {
          [slide.id]: action.payload.props,
        },
        { deep: true },
      );

    case DELETE_SLIDE:
      return _.omit(state, action.payload.slideId);

    case ADD_CONTENT_ITEM:
      slide = state[action.payload.slideId];

      return Immutable.merge(
        state,
        {
          [slide.id]: {
            contentItemIds: slide.contentItemIds.concat(action.payload.contentItemId),
            contentItemSequence: slide.contentItemSequence + 1,
          },
        },
        { deep: true },
      );

    case DELETE_CONTENT_ITEM:
      slide = state[action.payload.slideId];

      // The deleted contentItem might not be a direct descendant of a slide,
      // in which case the slide requires no change.
      if (Array.indexOf(slide.contentItemIds, action.payload.contentItemId) === -1) {
        return state;
      } else {
        return Immutable.merge(
          state,
          {
            [slide.id]: {
              contentItemIds: _.without(slide.contentItemIds, action.payload.contentItemId),
            },
          },
          { deep: true },
        );
      }

    case FETCH_DECK_SUCCESS:
      return action.payload.slidesById;

    default:
      return state;
  }
}

export default byId;
