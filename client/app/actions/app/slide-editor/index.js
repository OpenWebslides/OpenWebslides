
export const SET_ACTIVE_DECK_ID = 'SET_ACTIVE_DECK_ID';
export const SET_ACTIVE_SLIDE_ID = 'SET_ACTIVE_SLIDE_ID';
export const SET_ACTIVE_CONTENT_ITEM_ID = 'SET_ACTIVE_CONTENT_ITEM_ID';
export const SET_FOCUSED_CONTENT_ITEM_ID = 'SET_FOCUSED_CONTENT_ITEM_ID';
export const SET_SELECTION_OFFSETS = 'SET_SELECTION_OFFSETS';
export const SET_FOCUSED_SLIDE_VIEW_TYPE = 'SET_FOCUSED_SLIDE_VIEW_TYPE';
export const TOGGLE_SLIDE_VIEW = 'TOGGLE_SLIDE_VIEW';
export const ADD_URI = 'ADD_URI';

export function setActiveDeckId(deckId) {
  return {
    type: SET_ACTIVE_DECK_ID,
    payload: { deckId },
  };
}

export function setActiveSlideId(slideId) {
  return {
    type: SET_ACTIVE_SLIDE_ID,
    payload: { slideId },
  };
}

export function setActiveContentItemId(contentItemId) {
  return {
    type: SET_ACTIVE_CONTENT_ITEM_ID,
    payload: { contentItemId },
  };
}

export function setFocusedContentItemId(
  contentItemId,
  selectionOffsets = null,
  focusedSlideViewType = null,
  focusedTextPropName = null,
) {
  return {
    type: SET_FOCUSED_CONTENT_ITEM_ID,
    payload: { contentItemId, selectionOffsets, focusedSlideViewType, focusedTextPropName },
  };
}

export function setSelectionOffsets(selectionOffsets) {
  return {
    type: SET_SELECTION_OFFSETS,
    payload: { selectionOffsets },
  };
}

export function setFocusedSlideViewType(slideViewType) {
  return {
    type: SET_FOCUSED_SLIDE_VIEW_TYPE,
    payload: { slideViewType },
  };
}

export function toggleSlideView(slideViewType) {
  return {
    type: TOGGLE_SLIDE_VIEW,
    payload: { slideViewType },
  };
}
