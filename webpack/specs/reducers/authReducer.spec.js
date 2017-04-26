import faker from 'faker';
import Immutable from 'seamless-immutable';

import authReducer from 'reducers/authReducer';

import {
  SIGNIN_USER_SUCCESS,
} from 'actions/signinActions';

describe('Signin Reducer', () => {
  const emptyState = undefined;

  it('has a default immutable state', () => {
    const emptyAction = { type: '' };

    expect(
      authReducer(
        emptyState,
        emptyAction))
      .toEqual(
      Immutable({
        isAuthenticated: false,
        authToken: undefined,
      }));
  });

  it('can resolve SIGNIN_SUCCESS action', () => {
    const fakeToken = faker.random.uuid();

    expect(
      authReducer(emptyState, {
        type: SIGNIN_USER_SUCCESS,
        payload: {
          isAuthenticated: true,
          authToken: fakeToken,
        },
      }))
      .toEqual(Immutable({
        isAuthenticated: true,
        authToken: fakeToken,
      }));
  });
});
