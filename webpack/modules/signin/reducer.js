import {
  SIGNIN_SUCCESS,
} from './constants';

const initialState = {
  signedIn: false,
  authToken: '',
};

function signinReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS: {
      return Object.assign({}, state, {
        signedIn: true,
        authToken: action.payload.accessToken,
        id: action.payload.id,
      });
    }
    default: {
      return state;
    }
  }
}

export default signinReducer;
