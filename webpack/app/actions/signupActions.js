export const types = {
  REQUEST_SIGNUP: 'REQUEST_SIGNUP',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_ERROR: 'SIGNUP_ERROR',
};

export default function requestSignup({ email, password }) {
  return ({
    type: types.REQUEST_SIGNUP,
    meta: {
      email,
      password,
    },
  });
}
