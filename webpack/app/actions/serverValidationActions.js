// Action types
export const CHECK_EMAIL_AVAILABLE = 'CHECK_EMAIL_AVAILABLE';

// Action creators
export function checkEmailAvailable({ email, resolve, reject }) {
  return {
    type: CHECK_EMAIL_AVAILABLE,
    meta: { email, resolve, reject },
  };
}
