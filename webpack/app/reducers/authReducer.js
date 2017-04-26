import Immutable from 'seamless-immutable';

import {
  SIGNIN_USER_SUCCESS,
} from 'actions/signinActions';

const initialState = Immutable({
  isAuthenticated: false,
  authToken: undefined,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_USER_SUCCESS:
      return Immutable.merge(state, [action.payload, { isAuthenticated: true }]);

    default:
      return state;
  }
}

export default authReducer;
