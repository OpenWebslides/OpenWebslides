import faker from 'faker';
import signinReducer from 'reducers/signinReducer';
import { types } from 'actions/signinActions';

const emptyState = undefined;

describe('Signin Reducer', () => {
  it('has a default state', () => {
    const emptyAction = { type: '' };

    expect(
      signinReducer(
        emptyState,
        emptyAction))
      .toEqual({
        signedIn: false,
        authToken: '',
      });
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
      .toEqual({
        signedIn: true,
        authToken: fakeToken,
      });
  });
});
