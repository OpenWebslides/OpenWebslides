// Action types
export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';

// Action Creators
export function requestResetPassword({ values, resolve, reject }) {
  const { email } = values;

  return {
    type: REQUEST_RESET_PASSWORD,
    meta: { email, resolve, reject },
  };
}

export function resetPassword({ resetPasswordToken, values, resolve, reject }) {
  const { password } = values;

  return {
    type: RESET_PASSWORD,
    meta: { password, resetPasswordToken, resolve, reject },
  };
}
