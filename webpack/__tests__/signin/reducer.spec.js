import faker from 'faker';
import signinReducer from '../../modules/signin/reducer';
import { SIGNIN_SUCCESS } from '../../modules/signin/constants';

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
        type: SIGNIN_SUCCESS,
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
