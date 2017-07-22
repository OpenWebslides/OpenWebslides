import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { slideViewTypes } from 'constants/slideViewTypes';

import {
  SET_ACTIVE_DECK_ID,
  SET_ACTIVE_SLIDE_ID,
  SET_ACTIVE_CONTENT_ITEM_ID,
  SET_SELECTION_OFFSETS,
  TOGGLE_SLIDE_VIEW,
} from 'actions/app/slide-editor';
import { FETCH_DECK_SUCCESS } from 'actions/entities/decks';
import { ADD_SLIDE } from 'actions/entities/slides';
import { ADD_CONTENT_ITEM, UPDATE_CONTENT_ITEM } from 'actions/entities/content-items';

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

function setActiveDeckId(state, action) {
  return {
    ...state,
    activeDeckId: action.payload.deckId,
  };
}

function setActiveSlideId(state, action) {
  return {
    ...state,
    activeSlideId: action.payload.slideId,
  };
}

function setActiveContentItemId(state, action) {
  const selectionOffsets = action.payload.selectionOffsets;

  if (selectionOffsets !== null) {
    state = {
      ...state,
      selectionOffsets,
    }
  }

  return {
    ...state,
    activeContentItemId: action.payload.contentItemId,
  };
}

function setSelectionOffsets(state, action) {
  return {
    ...state,
    selectionOffsets: action.payload.selectionOffsets,
  };
}

function toggleSlideView(state, action) {
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
}

function fetchDeckSuccess(state, action) {
  return {
    ...state,
    activeDeckId: action.payload.activeDeckId,
    activeSlideId: action.payload.activeSlideId,
  };
}

function addSlide(state, action) {
  return {
    ...state,
    activeSlideId: action.payload.slideId,
  };
}

function addContentItem(state, action) {
  return {
    ...state,
    activeContentItemId: action.payload.contentItemId,
    selectionOffsets: {
      start: 0,
      end: 0,
    }
  }
}

function updateContentItem(state, action) {
  const selectionOffsets = action.payload.selectionOffsets;

  if (selectionOffsets !== null) {
    return {
      ...state,
      selectionOffsets,
    };
  } else {
    return state;
  }
}

export default function slideEditorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_DECK_ID: return setActiveDeckId(state, action);
    case SET_ACTIVE_SLIDE_ID: return setActiveSlideId(state, action);
    case SET_ACTIVE_CONTENT_ITEM_ID: return setActiveContentItemId(state, action);
    case SET_SELECTION_OFFSETS: return setSelectionOffsets(state, action);
    case TOGGLE_SLIDE_VIEW: return toggleSlideView(state, action);
    case FETCH_DECK_SUCCESS: return fetchDeckSuccess(state, action);
    case ADD_SLIDE: return addSlide(state, action);
    case ADD_CONTENT_ITEM: return addContentItem(state, action);
    case UPDATE_CONTENT_ITEM: return updateContentItem(state, action);
    default: return state;
  }
}
