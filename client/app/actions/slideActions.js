// Types
export const FETCH_SLIDES = 'FETCH_SLIDES';
export const FETCH_SLIDES_SUCCESS = 'FETCH_SLIDES_SUCCESS';
export const FETCH_SLIDES_FAILURE = 'FETCH_SLIDES_FAILURE';

export const ADD_SLIDE = 'ADD_SLIDE';

export const SELECT_SLIDE = 'SELECT_SLIDE';

// Creators
export function fetchSlides(deckId) {
  return {
    type: FETCH_SLIDES,
    meta: { deckId },
  };
}

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
