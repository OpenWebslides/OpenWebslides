import Immutable from 'seamless-immutable';

import { SIGNIN_USER_SUCCESS } from 'actions/signinActions';
import { SIGNOUT } from 'actions/signoutActions';

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

    case SIGNOUT:
      return Immutable.merge(state, { isAuthenticated: false, authToken: null, id: null, firstName: null });

    default:
      return state;
  }
}

export default authentication;
