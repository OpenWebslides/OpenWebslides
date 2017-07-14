import { FETCH_DECK_SUCCESS } from 'actions/deckActions';

const initialState = null;

export default function activeDeckId(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECK_SUCCESS:
      return action.payload.activeDeckId;
    default:
      return state;
  }
}
