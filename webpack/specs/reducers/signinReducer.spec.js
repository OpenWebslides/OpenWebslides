import faker from 'faker';
import Immutable from 'seamless-immutable';

import signinReducer from 'reducers/signinReducer';
import { types } from 'actions/signinActions';

describe('Signin Reducer', () => {
  const emptyState = undefined;

  it('has a default immutable state', () => {
    const emptyAction = { type: '' };

    expect(
      signinReducer(
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
      signinReducer(emptyState, {
        type: types.SIGNIN_SUCCESS,
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
