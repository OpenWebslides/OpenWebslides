// Action types
export const ADD_CONTENT_BLOCK = 'ADD_CONTENT_BLOCK';
export const SET_ACTIVE_CONTENT_BLOCK = 'SET_ACTIVE_CONTENT_BLOCK';
export const DELETE_CONTENT_BLOCKS = 'DELETE_CONTENT_BLOCKS';

// Action Creators
export function setActiveContentBlock(contentBlockId) {
  return {
    type: SET_ACTIVE_CONTENT_BLOCK,
    payload: { contentBlockId },
  };
}

export function deleteContentBlocks(contentBlocksIds) {
  return {
    type: DELETE_CONTENT_BLOCKS,
    payload: { contentBlocksIds },
  };
}

export function addContentBlock(slideId, contentBlockId, type) {
  return {
    type: ADD_CONTENT_BLOCK,
    payload: { slideId, contentBlockId, type },
  };
}
