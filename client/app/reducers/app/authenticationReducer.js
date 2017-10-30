import Immutable from 'seamless-immutable';

import { SIGNIN_USER_SUCCESS } from 'actions/signinActions';
import { authTypes } from 'constants/auth';
import { UPDATE_TOKEN } from 'actions/updateTokenActions';

const initialState = Immutable({
  isAuthenticated: false,
  authToken: null,
  firstName: null,
  id: null,
});

function authentication(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_USER_SUCCESS:
      return Immutable.merge(state, [
        action.payload,
        { isAuthenticated: true },
      ]);

    case authTypes.SIGNOUT:
      return Immutable.merge(state, {
        isAuthenticated: false,
        authToken: null,
        id: null,
        firstName: null,
      });
    case UPDATE_TOKEN:
      return Immutable.merge(state, {
        authToken: action.payload,
      });
    default:
      return state;
  }
}

export default authentication;
