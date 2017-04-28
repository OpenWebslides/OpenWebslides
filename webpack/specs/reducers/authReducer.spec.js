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
        firstName: undefined,
      }));
  });

  it('can resolve SIGNIN_SUCCESS action', () => {
    const fakeToken = faker.random.uuid();
    const fakeFirstName = faker.name.firstName();

    expect(
      authReducer(emptyState, {
        type: SIGNIN_USER_SUCCESS,
        payload: {
          authToken: fakeToken,
          firstName: fakeFirstName,
        },
      }))
      .toEqual(Immutable({
        isAuthenticated: true,
        authToken: fakeToken,
        firstName: fakeFirstName,
      }));
  });
});
