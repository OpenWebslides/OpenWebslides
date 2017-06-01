// Types
export const ADD_SLIDE = 'ADD_SLIDE';
export const SELECT_SLIDE = 'SELECT_SLIDE';

// Creators
export function addSlide(newSlideId) {
  return {
    type: ADD_SLIDE,
    payload: { newSlideId },
  };
}

export function selectSlide(selectedSlideId) {
  return {
    type: SELECT_SLIDE,
    payload: { selectedSlideId },
  };
}
