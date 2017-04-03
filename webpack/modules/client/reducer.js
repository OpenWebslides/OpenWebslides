import { SET_CLIENT, UNSET_CLIENT } from './constants';

const initialState = {
  token: null,
};

function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CLIENT:
      return {
        token: action.payload.token,
      };

    case UNSET_CLIENT:
      return {
        token: null,
      };

    default:
      return state;
  }
}

export default clientReducer;
