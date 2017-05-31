// Types
export const CHECK_EMAIL = 'CHECK_EMAIL';

// Creators
export function checkEmail({ email, resolve, reject }) {
  return {
    type: CHECK_EMAIL,
    meta: { email, resolve, reject },
  };
}
