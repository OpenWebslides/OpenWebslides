import {
  REQUEST_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants';

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
    case SIGNUP_SUCCESS:
      return {
        errors: [],
        messages: [{
          body: `Successfully created account for ${action.response.email}`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
      };

    default:
      return state;
  }
}

export default signupReducer;
