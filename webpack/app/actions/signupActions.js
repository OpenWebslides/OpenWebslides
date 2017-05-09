// Types
export const SIGNUP_USER = 'SIGNUP_USER';

// Creators
export function signupUser(values) {
  return {
    type: SIGNUP_USER,
    meta: values,
  };
}
