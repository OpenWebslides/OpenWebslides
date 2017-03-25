import { REQUEST_SIGNUP } from './constants';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
};

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SIGNUP:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      };

    default:
      return state;
  }
}

export default signupReducer;
