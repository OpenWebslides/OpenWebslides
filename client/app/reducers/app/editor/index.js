import _ from 'lodash';

import { slideViewTypes } from 'constants/slideViewTypes';

import { FETCH_DECK_SUCCESS } from 'actions/deckActions';
import { SET_ACTIVE_SLIDE, ADD_SLIDE } from 'actions/slideActions';
import { SET_ACTIVE_CONTENT_ITEM, UPDATE_SELECTION } from 'actions/contentBlockActions';
import { TOGGLE_SLIDE_VIEW } from 'actions/slideEditorActions';

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

export default function editorReducer(state = initialState, action) {
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
