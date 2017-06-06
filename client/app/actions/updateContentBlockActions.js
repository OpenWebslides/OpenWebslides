// Action Types
export const UPDATE_CONTENT_BLOCK = 'UPDATE_CONTENT_BLOCK';

// Action Creators
export function updateContentBlock(contentBlockId) {
  return {
    type: UPDATE_CONTENT_BLOCK,
    payload: { contentBlockId },
  };
}
