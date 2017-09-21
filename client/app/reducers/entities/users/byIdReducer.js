import Immutable from 'seamless-immutable';
import { FETCH_USER_SUCCESS, FETCH_USER_COLLABORATIONS_SUCCESS } from 'actions/entities/users';

const initialState = Immutable({});


function byId(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return state.merge({
        [action.payload.id]: action.payload,
      });
    case FETCH_USER_COLLABORATIONS_SUCCESS:
      return state.merge({
        [action.payload.userId]: { collaborations: action.payload.collaborations },
      });
    default: return state;
  }
}

export default byId;
