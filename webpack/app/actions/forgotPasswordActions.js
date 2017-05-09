// Types
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';

// Creators
export function forgotPassword({ values, resolve, reject }) {
  const { email } = values;

  return {
    type: FORGOT_PASSWORD,
    meta: { email, resolve, reject },
  };
}
