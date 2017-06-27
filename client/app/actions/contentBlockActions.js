// Action types
export const ADD_TITLE = 'ADD_TITLE';
export const SET_ACTIVE_CONTENT_BLOCK = 'SET_ACTIVE_CONTENT_BLOCK';

// Action Creators
export function setActiveContentBlock(contentBlockId) {
  return {
    type: SET_ACTIVE_CONTENT_BLOCK,
    payload: { contentBlockId },
  };
}

export function addTitle(slideId, contentBlockId) {
  return {
    type: ADD_TITLE,
    payload: { slideId, contentBlockId },
  };
}
