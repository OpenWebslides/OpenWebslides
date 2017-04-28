// Action types
export const RESET_PASSWORD = 'RESET_PASSWORD';

// Action Creators
export function resetPassword({ values, resolve, reject }) {
  const { email } = values;
  return {
    type: RESET_PASSWORD,
    meta: { email, resolve, reject },
  };
}
