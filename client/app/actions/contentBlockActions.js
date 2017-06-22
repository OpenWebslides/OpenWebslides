// Action types
export const ADD_TITLE = 'ADD_TITLE';

// Action Creators
export function addTitle(slideId) {
  return {
    type: ADD_TITLE,
    payload: { [slideId]: { content: {} } },
  };
}
