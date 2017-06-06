// Action types
export const CONFIRM_EMAIL = 'CONFIRM_EMAIL';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_FAILURE = 'CONFIRM_EMAIL_FAILURE';

// Action Creators
export function confirmEmail(confirmationToken) {
  return {
    type: CONFIRM_EMAIL,
    meta: { confirmationToken },
  };
}
