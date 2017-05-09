import faker from 'faker';
import { call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import * as resetPasswordSaga from 'sagas/resetPassword';
import resetPasswordApi from 'api/resetPassword';

describe('Reset Password Saga', () => {
  describe('Reset Password Flow', () => {
    const password = faker.internet.password();
    const resetPasswordToken = faker.random.alphaNumeric(20);
    const resolve = jest.fn();
    const reject = jest.fn();

    it('has a happy path', () => {
      const generator = resetPasswordSaga.doResetPassword({
        meta: { password, resetPasswordToken, resolve, reject },
      });

      expect(generator.next().value).toEqual(
        call(resetPasswordApi, resetPasswordToken, password),
      );

      expect(generator.next().value).toEqual(call(resolve));

      expect(generator.next().done).toBeTruthy();
    });

    it('throws an error when password reset token is invalid', () => {
      const message = faker.lorem.sentence();
      const statusCode = 400;

      const generator = resetPasswordSaga.doResetPassword({
        meta: { resetPasswordToken, password, resolve, reject },
      });

      expect(generator.next().value).toEqual(
        call(resetPasswordApi, resetPasswordToken, password),
      );

      expect(generator.throw({ message, statusCode }).value).toEqual({
        _error: 'Password reset token is invalid.',
      });

      expect(generator.next().value).toEqual(
        call(reject, new SubmissionError()),
      );

      expect(generator.next().done).toBeTruthy();
    });

    it('throws an error when server connection fails', () => {
      const message = faker.lorem.sentence();
      const statusCode = 500;

      const generator = resetPasswordSaga.doResetPassword({
        meta: { resetPasswordToken, password, resolve, reject },
      });

      expect(generator.next().value).toEqual(
        call(resetPasswordApi, resetPasswordToken, password),
      );

      expect(generator.throw({ message, statusCode }).value).toEqual({
        _error: 'Something went wrong on our end.',
      });

      expect(generator.next().value).toEqual(
        call(reject, new SubmissionError()),
      );

      expect(generator.next().done).toBeTruthy();
    });
  });
});
