// Action types
export const SIGNUP_USER = 'SIGNUP_USER';

// Action Creators
export function signupUser(values) {
  return {
    type: SIGNUP_USER,
    meta: values,
  };
}
