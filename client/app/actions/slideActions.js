// Types
export const UPDATE_SLIDE = 'UPDATE_SLIDE';

export const ADD_SLIDE = 'ADD_SLIDE';
export const DELETE_SLIDE = 'DELETE_SLIDE';
export const DELETE_SLIDE_WITH_CONTENT = 'DELETE_SLIDE_WITH_CONTENT';

export const SET_ACTIVE_SLIDE = 'SET_ACTIVE_SLIDE';

// Creators
export function updateSlide(id, data) {
  return {
    type: UPDATE_SLIDE,
    payload: { id, data },
  };
}

export function addSlide(slideId) {
  return {
    type: ADD_SLIDE,
    payload: { slideId },
  };
}

export function deleteSlideWithContent(slideId) {
  return {
    type: DELETE_SLIDE_WITH_CONTENT,
    meta: { slideId },
  };
}

export function setActiveSlide(slideId) {
  return {
    type: SET_ACTIVE_SLIDE,
    payload: { slideId },
  };
}
