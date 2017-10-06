import Immutable from 'seamless-immutable';
import { FETCH_USER_SUCCESS, FETCH_USER_COLLABORATIONS_SUCCESS, FETCH_USER_DECKS_IDS_SUCCESS } from 'actions/entities/users';
import {
  DECK_DELETION_SUCCESS,
} from 'actions/entities/decks';


const initialState = Immutable({});

function deleteDeckFromUsers(state, action) {
  const deleteId = action.payload;

  const newState = {};
  Object.keys(state).forEach((userId) => {
    const newIds = state[userId].decks.filter(id => id !== deleteId);
    const newCollaborations = state[userId].collaborations ?
      state[userId].collaborations.filter(id => id !== deleteId) : [];

    newState[userId] = {
      ...state[userId],
      decks: newIds,
      collaborations: newCollaborations,
    };
  });

  return newState;
}



function byId(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return state.merge({
        [action.payload.id]: action.payload,
      });
    case FETCH_USER_COLLABORATIONS_SUCCESS:
      return state.merge({
        [action.payload.id]: { collaborations: action.payload.collaborations },
      }, { deep: true });
    case FETCH_USER_DECKS_IDS_SUCCESS:
      return state.merge({
        [action.payload.id]: { decks: action.payload.deckIds },
      }, { deep: true });
    case DECK_DELETION_SUCCESS:
      return deleteDeckFromUsers(state, action);
    default: return state;
  }
}

export default byId;
