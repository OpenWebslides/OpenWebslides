import faker from 'faker';
import { Map } from 'immutable';

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
      Map({
        signedIn: false,
        authToken: '',
      }));
  });

  it('can resolve SIGNIN_SUCCESS action', () => {
    const fakeToken = faker.random.uuid();

    expect(
      signinReducer(emptyState, {
        type: types.SIGNIN_SUCCESS,
        payload: {
          signedIn: true,
          accessToken: fakeToken,
        },
      }))
      .toEqual(Map({
        signedIn: true,
        authToken: fakeToken,
      }));
  });
});
