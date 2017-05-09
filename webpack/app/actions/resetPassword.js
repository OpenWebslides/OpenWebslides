// Types
export const RESET_PASSWORD = 'RESET_PASSWORD';

// Creators
export function resetPassword({ resetPasswordToken, values, resolve, reject }) {
  const { password } = values;

  return {
    type: RESET_PASSWORD,
    meta: { password, resetPasswordToken, resolve, reject },
  };
}
