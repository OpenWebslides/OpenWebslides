// Types
export const UPDATE_SLIDE = 'UPDATE_SLIDE';

export const ADD_SLIDE = 'ADD_SLIDE';
export const DELETE_SLIDE = 'DELETE_SLIDE';
export const DELETE_SLIDE_WITH_CONTENT = 'DELETE_SLIDE_WITH_CONTENT';


// Creators
export function updateSlide(id, data) {
  return {
    type: UPDATE_SLIDE,
    payload: { id, data },
  };
}

export function addSlide(deckId, slideId) {
  return {
    type: ADD_SLIDE,
    payload: { deckId, slideId },
  };
}

export function deleteSlideWithContent(deckId, slideId) {
  return {
    type: DELETE_SLIDE_WITH_CONTENT,
    meta: { deckId, slideId },
  };
}
