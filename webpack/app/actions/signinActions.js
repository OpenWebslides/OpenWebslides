// Action Types
export const EMAIL_SIGNIN_USER = 'EMAIL_SIGNIN_USER';
export const OAUTH_SIGNIN_USER = 'OAUTH_SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';

// Action Creators

// Dispatched from emailSigninFormPage
export function emailSigninUser({ values, resolve, reject }) {
  return {
    type: EMAIL_SIGNIN_USER,
    meta: { resolve, reject, values },
  };
}

// Dispatched from oauthCallbackPage
export function oauthSigninUser({ authToken }) {
  return {
    type: OAUTH_SIGNIN_USER,
    meta: {
      authToken,
    },
  };
}
