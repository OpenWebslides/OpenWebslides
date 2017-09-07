export const UPDATE_TOKEN = 'UPDATE_TOKEN';

export function updateToken(newToken) {
  return {
    type: UPDATE_TOKEN,
    payload: newToken,
  };
}
