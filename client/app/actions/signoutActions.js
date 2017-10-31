import { authTypes } from 'constants/auth';

export function signout() {
  return {
    type: authTypes.SIGNOUT,
  };
}

export function casSignout() {
  return {
    type: authTypes.CAS_SIGNOUT,
  };
}
