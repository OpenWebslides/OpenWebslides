export const types = {
  REQUEST_SIGNIN: 'REQUEST_SIGNIN',
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
  SIGNIN_ERROR: 'SIGNIN_ERROR',
  SIGNOUT_REQUEST: 'SIGNIN_REQUEST',
};

export default function requestSignin({ email, password }) {
  return {
    type: types.REQUEST_SIGNIN,
    meta: {
      email,
      password,
    },
  };
}
