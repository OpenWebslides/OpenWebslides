// Types
export const FETCH_SLIDES = 'FETCH_SLIDES';
export const FETCH_SLIDES_SUCCESS = 'FETCH_SLIDES_SUCCESS';
export const FETCH_SLIDES_FAILURE = 'FETCH_SLIDES_FAILURE';

// Creators
export function fetchSlides(deckId) {
  return {
    type: FETCH_SLIDES,
    meta: { deckId },
  };
}
