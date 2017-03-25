import { SET_CLIENT, UNSET_CLIENT } from './constants';

const initialState = {
  id: null,
  token: null,
};

function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CLIENT:
      return {
        id: action.payload.token.userId,
        token: action.payload.token,
      };

    case UNSET_CLIENT:
      return {
        id: null,
        token: null,
      };

    default:
      return state;
  }
}

export default clientReducer;
