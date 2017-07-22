
export const ADD_SLIDE = 'ADD_SLIDE';
export const UPDATE_SLIDE = 'UPDATE_SLIDE';
export const DELETE_SLIDE = 'DELETE_SLIDE';
export const DELETE_SLIDE_WITH_CONTENT = 'DELETE_SLIDE_WITH_CONTENT';

export function addSlide(slideId, deckId) {
  return {
    type: ADD_SLIDE,
    payload: { slideId, deckId },
  };
}

export function updateSlide(slideId, props) {
  return {
    type: UPDATE_SLIDE,
    payload: { slideId, props },
  };
}

export function deleteSlide(slideId, deckId, contentItemIds = []) {
  return {
    type: DELETE_SLIDE,
    payload: { slideId, deckId, contentItemIds },
  }
}

export function deleteSlideWithContent(slideId, deckId) {
  return {
    type: DELETE_SLIDE_WITH_CONTENT,
    meta: { slideId, deckId },
  };
}
