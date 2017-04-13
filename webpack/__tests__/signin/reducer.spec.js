import signinReducer from '../../modules/signin/reducer';
import { SIGNIN_SUCCESS } from '../../modules/signin/constants';

const emptyState = undefined;
const emptyAction = { type: '' };

describe('Signin Reducer', () => {
  it('has a default state', () => {
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
    expect(
      signinReducer(emptyState, {
        type: SIGNIN_SUCCESS,
        payload: {
          signedIn: true,
          accessToken: 'random token',
        },
      }))
      .toEqual({
        signedIn: true,
        authToken: 'random token',
      });
  });
});
