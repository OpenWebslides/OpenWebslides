import Immutable from 'seamless-immutable';

import {
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILURE,
} from 'actions/confirmEmail';

const initialState = Immutable({
  emailConfirmed: 'confirming',
});

function confirmEmail(state = initialState, action) {
  switch (action.type) {
    case CONFIRM_EMAIL_SUCCESS:
      return Immutable.merge(state, { emailConfirmed: 'success' });

    case CONFIRM_EMAIL_FAILURE:
      return Immutable.merge(state, { emailConfirmed: 'failed' });

    default:
      return state;
  }
}

export default confirmEmail;
