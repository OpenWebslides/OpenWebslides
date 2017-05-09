import faker from 'faker';
import Immutable from 'seamless-immutable';

import authReducer from 'reducers/auth';

import { SIGNIN_USER_SUCCESS } from 'actions/signin';

describe('Auth Reducer', () => {
  const emptyState = undefined;

  it('has a default immutable state', () => {
    const emptyAction = { type: '' };

    expect(authReducer(emptyState, emptyAction)).toEqual(
      Immutable({
        isAuthenticated: false,
        authToken: undefined,
      }),
    );
  });

  it('can resolve SIGNIN_USER_SUCCESS action', () => {
    const token = faker.random.uuid();

    expect(
      authReducer(emptyState, {
        type: SIGNIN_USER_SUCCESS,
        payload: {
          authToken: token,
        },
      }),
    ).toEqual(
      Immutable({
        isAuthenticated: true,
        authToken: token,
      }),
    );
  });
});
