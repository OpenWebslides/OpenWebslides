import Immutable from 'immutable';
import { types } from 'actions/signinActions';

const initialState = Immutable.Map({
  signedIn: false,
  authToken: '',
});

function signinReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGNIN_SUCCESS: {
      return state.merge({
        signedIn: true,
        authToken: action.payload.accessToken,
      });
    }

    default: {
      return state;
    }
  }
}

export default signinReducer;
