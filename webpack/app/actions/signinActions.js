// Action Types
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';

// Action Creators
export function signinUser({ values, resolve, reject }) {
  return {
    type: SIGNIN_USER,
    meta: { resolve, reject, values },
  };
}
