import { call, put } from 'redux-saga/effects';
import faker from 'faker';

import confirmEmailApi from 'api/confirmEmailApi';

import {
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILURE,
} from 'actions/confirmEmailActions';

import { doConfirmEmail } from 'sagas/confirmEmailSaga';

describe('Confirm Email Saga', () => {
  describe('Confirmation Email Flow', () => {
    const confirmationToken = faker.random.alphaNumeric(20);

    it('has a happy path', () => {
      const generator = doConfirmEmail({
        meta: { confirmationToken },
      });

      expect(generator.next().value).toEqual(
        call(confirmEmailApi, confirmationToken),
      );

      expect(generator.next().value).toEqual(
        put({ type: CONFIRM_EMAIL_SUCCESS }),
      );

      expect(generator.next().done).toBeTruthy();
    });

    it('throws when confirmation token is invalid', () => {
      const message = faker.lorem.sentence();
      const statusCode = 400;

      const generator = doConfirmEmail({
        meta: { confirmationToken },
      });

      expect(generator.next().value).toEqual(
        call(confirmEmailApi, confirmationToken),
      );

      expect(generator.throw({ message, statusCode }).value).toEqual(
        put({ type: CONFIRM_EMAIL_FAILURE }),
      );

      expect(generator.next().done).toBeTruthy();
    });

    it('throws when server connection failed', () => {
      const message = faker.lorem.sentence();
      const statusCode = 500;

      const generator = doConfirmEmail({
        meta: { confirmationToken },
      });

      expect(generator.next().value).toEqual(
        call(confirmEmailApi, confirmationToken),
      );

      expect(generator.throw({ message, statusCode }).value).toEqual(
        put({ type: CONFIRM_EMAIL_FAILURE }),
      );

      expect(generator.next().done).toBeTruthy();
    });
  });
});
