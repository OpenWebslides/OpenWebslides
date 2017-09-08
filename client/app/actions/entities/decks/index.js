export const ADD_SLIDE_TO_DECK = 'ADD_SLIDE_TO_DECK';
export const DELETE_SLIDE_FROM_DECK = 'DELETE_SLIDE_FROM_DECK';

export const UPDATE_DECK = 'UPDATE_DECK';
export const UPDATE_DECK_SUCCESS = 'UPDATE_DECK_SUCCESS';
export const UPDATE_DECK_FAILURE = 'UPDATE_DECK_FAILURE';

export const FETCH_DECK = 'FETCH_DECK';
export const FETCH_DECK_SUCCESS = 'FETCH_DECK_SUCCESS';
export const FETCH_DECK_FAILURE = 'FETCH_DECK_FAILURE';

export function addSlideToDeck(deckId, previousSlideId) {
  return {
    type: ADD_SLIDE_TO_DECK,
    meta: { deckId, previousSlideId },
  };
}

export function deleteSlideFromDeck(deckId, slideId) {
  return {
    type: DELETE_SLIDE_FROM_DECK,
    meta: { deckId, slideId },
  };
}

export function updateDeck() {
  return {
    type: UPDATE_DECK,
  };
}

export function fetchDeck(deckId) {
  return {
    type: FETCH_DECK,
    meta: { deckId },
  };
}

export function fetchDeckSuccess(deckId, meta, slidesById, contentItemsById) {
  return {
    type: FETCH_DECK_SUCCESS,
    payload: { deckId, meta, slidesById, contentItemsById },
  };
}
