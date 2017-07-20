// Action types
export const UPDATE_DECK = 'UPDATE_DECK';
export const UPDATE_DECK_SUCCESS = 'UPDATE_DECK_SUCCESS';
export const UPDATE_DECK_FAILURE = 'UPDATE_DECK_FAILURE';

export const FETCH_DECK = 'FETCH_DECK';
export const FETCH_DECK_SUCCESS = 'FETCH_DECK_SUCCESS';
export const FETCH_DECK_FAILURE = 'FETCH_DECK_FAILURE';

// Action Creators
export function fetchDeck(deckId) {
  return {
    type: FETCH_DECK,
    meta: { deckId },
  };
}

export function updateDeck() {
  return {
    type: UPDATE_DECK,
  };
}
