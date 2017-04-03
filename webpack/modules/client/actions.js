import { SET_CLIENT, UNSET_CLIENT } from './constants';

export function setClient(token) {
  return {
    type: SET_CLIENT,
    payload: { token },
  };
}

export function unsetClient() {
  return {
    type: UNSET_CLIENT,
  };
}
