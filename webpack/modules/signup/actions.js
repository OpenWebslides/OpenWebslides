import { REQUEST_SIGNUP } from './constants';

function requestSignup({ email, password }) {
  return ({
    type: REQUEST_SIGNUP,
    meta: {
      email,
      password,
    },
  });
}

export default requestSignup;
