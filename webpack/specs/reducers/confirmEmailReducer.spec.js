import Immutable from 'seamless-immutable';

import {
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILURE,
} from 'actions/confirmEmail';
import confirmEmailReducer from 'reducers/confirmEmail';

describe('Confirm Email Reducer', () => {
  it('has an immutable initial state', () => {
    expect(confirmEmailReducer(undefined, { type: undefined })).toEqual(
      Immutable({ emailConfirmed: 'confirming' }),
    );
  });

  it('can handle CONFIRM_EMAIL_SUCCESS', () => {
    expect(
      confirmEmailReducer(undefined, {
        type: CONFIRM_EMAIL_SUCCESS,
      }),
    ).toEqual({ emailConfirmed: 'success' });
  });

  it('can handle CONFIRM_EMAIL_FAILURE', () => {
    expect(
      confirmEmailReducer(undefined, {
        type: CONFIRM_EMAIL_FAILURE,
      }),
    ).toEqual({ emailConfirmed: 'failed' });
  });
});
