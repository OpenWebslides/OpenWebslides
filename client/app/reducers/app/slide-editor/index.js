import _ from 'lodash';
import Immutable from 'seamless-immutable';

import {slideViewTypes} from 'constants/slideViewTypes';

import {
  SET_ACTIVE_DECK_ID,
  SET_ACTIVE_SLIDE_ID,
  SET_ACTIVE_CONTENT_ITEM_ID,
  SET_SELECTION_OFFSETS,
  TOGGLE_SLIDE_VIEW,
} from 'actions/app/slide-editor';
import {FETCH_DECK_SUCCESS} from 'actions/entities/decks';
import {ADD_SLIDE} from 'actions/entities/slides';

const initialState = Immutable({
  activeDeckId: null,
  activeSlideId: null,
  activeContentItemId: null,
  selectionOffsets: {
    start: 0,
    end: 0,
  },
  activeSlideViewTypes: [
    slideViewTypes.LIVE,
    slideViewTypes.CONTENT,
  ],
});

export default function slideEditorReducer(state = initialState, action) {
  switch (action.type) {

    case SET_ACTIVE_DECK_ID:
      return {
        ...state,
        activeDeckId: action.payload.deckId,
      };

    case SET_ACTIVE_SLIDE_ID:
      return {
        ...state,
        activeSlideId: action.payload.slideId,
      };

    case SET_ACTIVE_CONTENT_ITEM_ID:
      return {
        ...state,
        activeContentItemId: action.payload.contentItemId,
      };

    case SET_SELECTION_OFFSETS:
      return {
        ...state,
        selectionOffsets: action.payload.selectionOffsets,
      };

    case TOGGLE_SLIDE_VIEW:
      const slideViewType = action.payload.slideViewType;
      const currentActiveSlideViewTypes = state.activeSlideViewTypes;

      let activeSlideViewTypes;
      if (Array.indexOf(currentActiveSlideViewTypes, slideViewType) !== -1) {
        // Cannot remove the last active slide view type.
        if (currentActiveSlideViewTypes.length <= 1) {
          activeSlideViewTypes = currentActiveSlideViewTypes;
        } else {
          activeSlideViewTypes = _.without(currentActiveSlideViewTypes, slideViewType);
        }
      } else {
        activeSlideViewTypes = [...currentActiveSlideViewTypes, slideViewType];
      }

      return {
        ...state,
        activeSlideViewTypes,
      };

    case FETCH_DECK_SUCCESS:
      return {
        ...state,
        activeDeckId: action.payload.activeDeckId,
        activeSlideId: action.payload.activeSlideId,
      };

    case ADD_SLIDE:
      return {
        ...state,
        activeSlideId: action.payload.slideId,
      };

    default:
      return state;
  }
}
