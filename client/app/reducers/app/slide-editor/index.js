import _ from 'lodash';

import { slideViewTypes } from 'constants/slideViewTypes';

import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';
import { SET_ACTIVE_SLIDE, ADD_SLIDE } from 'actions/entities/slides';
import { SET_ACTIVE_CONTENT_ITEM, UPDATE_SELECTION } from 'actions/entities/content-items';
import { TOGGLE_SLIDE_VIEW } from 'actions/app/slide-editor';

const initialState = {
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
};

export default function slideEditorReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_DECK_SUCCESS:
      return {
        ...state,
        activeDeckId: action.payload.activeDeckId
      };

    case SET_ACTIVE_SLIDE:
      return {
        ...state,
        activeSlideId: action.payload.slideId
      };

    case ADD_SLIDE:
      return {
        ...state,
        activeSlideId: action.payload.slideId,
      };

    case SET_ACTIVE_CONTENT_ITEM:
      return {
        ...state,
        activeContentItemId: action.payload.contentItemId,
      };

    case UPDATE_SELECTION:
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
        activeSlideViewTypes
      };

    default:
      return state;
  }
}
