// Action types
export const UPDATE_DECK = 'UPDATE_DECK';
export const UPDATE_DECK_SUCCESS = 'UPDATE_DECK_SUCCESS';
export const UPDATE_DECK_FAILURE = 'UPDATE_DECK_FAILURE';

// Action Creators
export function updateDeck() {
  return {
    type: UPDATE_DECK,
  };
}
