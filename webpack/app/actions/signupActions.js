// Action types
export const SIGNUP_USER = 'SIGNUP_USER';

// Action Creators
export function signupUser(value) {
  return ({
    type: SIGNUP_USER,
    meta: value,
  });
}
