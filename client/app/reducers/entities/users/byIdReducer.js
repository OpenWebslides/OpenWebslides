import Immutable from 'seamless-immutable';
import { SET_USER, SET_USER_COLLABORATIONS, SET_USER_DECKS_IDS } from 'actions/entities/users';
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
    case SET_USER:
      return state.merge({
        [action.payload.id]: action.payload,
      });
    case SET_USER_COLLABORATIONS:
      return state.merge({
        [action.payload.userId]: { collaborations: action.payload.collaborationIds },
      }, { deep: true });
    case SET_USER_DECKS_IDS:
      return state.merge({
        [action.payload.userId]: { decks: action.payload.decksIds },
      }, { deep: true });
    case DECK_DELETION_SUCCESS:
      return deleteDeckFromUsers(state, action);
    default: return state;
  }
}

export default byId;
