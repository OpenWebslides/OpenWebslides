// Types
export const FETCH_SLIDES = 'FETCH_SLIDES';
export const FETCH_SLIDES_SUCCESS = 'FETCH_SLIDES_SUCCESS';
export const FETCH_SLIDES_FAILURE = 'FETCH_SLIDES_FAILURE';

export const UPDATE_SLIDE = 'UPDATE_SLIDE';

export const ADD_SLIDE = 'ADD_SLIDE';

export const SET_ACTIVE_SLIDE = 'SET_ACTIVE_SLIDE';

// Creators
export function fetchSlides(deckId) {
  return {
    type: FETCH_SLIDES,
    meta: { deckId },
  };
}

export function updateSlide(id, content) {
  return {
    type: UPDATE_SLIDE,
    payload: { id, content },
  };
}

export function addSlide(newSlideId) {
  return {
    type: ADD_SLIDE,
    payload: { newSlideId },
  };
}

export function setActiveSlide(slideId) {
  return {
    type: SET_ACTIVE_SLIDE,
    payload: { slideId },
  };
}
