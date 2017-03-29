import { REQUEST_SIGNUP } from './constants';

function requestSignup({ email, password }) {
  return {
    type: REQUEST_SIGNUP,
    email,
    password,
  };
}

export default requestSignup;
