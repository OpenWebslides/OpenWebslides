import { call, put } from 'redux-saga/effects';
import faker from 'faker';

import confirmEmailApi from 'api/confirmEmail';

import {
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILURE,
} from 'actions/confirmEmailActions';

import { doConfirmEmail } from 'sagas/confirmEmailSaga';


describe('Confirm Email Saga', () => {
  describe('Confirmation Email Flow', () => {
    const fakeConfirmationToken = faker.random.alphaNumeric(20);

    it('has a happy path', () => {
      const generator = doConfirmEmail(
        {
          meta: {
            confirmationToken: fakeConfirmationToken,
          },
        });

      expect(generator.next()
        .value)
        .toEqual(
        call(confirmEmailApi, fakeConfirmationToken),
      );

      expect(generator.next()
        .value)
        .toEqual(
        put({ type: CONFIRM_EMAIL_SUCCESS }),
      );

      expect(generator.next().done)
        .toBeTruthy();
    });

    it('throws when confirmation token is invalid', () => {
      const fakeErrorMessage = faker.lorem.sentence();
      const fakeStatusCode = 400;

      const generator = doConfirmEmail(
        {
          meta: {
            confirmationToken: fakeConfirmationToken,
          },
        });

      expect(generator.next()
        .value)
        .toEqual(
        call(confirmEmailApi, fakeConfirmationToken),
      );

      expect(generator.throw({
        message: fakeErrorMessage,
        statusCode: fakeStatusCode,
      })
        .value)
        .toEqual(
        put({ type: CONFIRM_EMAIL_FAILURE }),
      );

      expect(generator.next().done)
        .toBeTruthy();
    });

    it('throws when server connection failed', () => {
      const fakeErrorMessage = faker.lorem.sentence();
      const fakeStatusCode = 500;

      const generator = doConfirmEmail(
        {
          meta: {
            confirmationToken: fakeConfirmationToken,
          },
        });

      expect(generator.next()
        .value)
        .toEqual(
        call(confirmEmailApi, fakeConfirmationToken),
      );

      expect(generator.throw({
        message: fakeErrorMessage,
        statusCode: fakeStatusCode,
      })
        .value)
        .toEqual(
        put({ type: CONFIRM_EMAIL_FAILURE }),
      );

      expect(generator.next().done)
        .toBeTruthy();
    });
  });
});
