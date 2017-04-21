import Immutable from 'seamless-immutable';
import { types } from 'actions/signinActions';

const initialState = Immutable({
  isAuthenticated: false,
  authToken: undefined,
});

function signinReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGNIN_SUCCESS:
      return Immutable.merge(state, [action.payload, { isAuthenticated: true }]);

    default:
      return state;
  }
}

export default signinReducer;
