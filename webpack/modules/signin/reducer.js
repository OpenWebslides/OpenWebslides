import {
  REQUEST_SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
} from './constants';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
};

function signinReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SIGNIN:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
      };
    case SIGNIN_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      };
    case SIGNIN_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      };
    default:
      return state;
  }
}

export default signinReducer;
