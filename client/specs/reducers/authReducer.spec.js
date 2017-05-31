import faker from 'faker';
import Immutable from 'seamless-immutable';

import authenticationReducer from 'reducers/app/authenticationReducer';

import { SIGNIN_USER_SUCCESS } from 'actions/signinActions';

describe('Auth Reducer', () => {
  const emptyState = undefined;

  it('has a default immutable state', () => {
    const emptyAction = { type: '' };

    expect(authenticationReducer(emptyState, emptyAction)).toEqual(
      Immutable({
        isAuthenticated: false,
        authToken: undefined,
        id: undefined,
        firstName: '',
      }),
    );
  });

  it('can resolve SIGNIN_USER_SUCCESS action', () => {
    const token = faker.random.uuid();
    const firstName = faker.name.firstName();

    expect(
      authenticationReducer(emptyState, {
        type: SIGNIN_USER_SUCCESS,
        payload: {
          authToken: token,
          id: 213423,
          firstName,
        },
      }),
    ).toEqual(
      Immutable({
        isAuthenticated: true,
        authToken: token,
        id: 213423,
        firstName,
      }),
    );
  });
});
