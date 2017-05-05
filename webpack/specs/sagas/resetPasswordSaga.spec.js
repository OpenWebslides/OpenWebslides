import faker from 'faker';
import { call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import * as resetPasswordSaga from 'sagas/resetPassword/resetPasswordSaga';
import resetPasswordApi from 'api/resetPassword/resetPassword';

describe('Reset Password Saga', () => {
  describe('Reset Password Flow', () => {
    const fakePassword = faker.internet.password();
    const fakePasswordToken = faker.random.alphaNumeric(20);
    const resolve = jest.fn();
    const reject = jest.fn();

    it('has a happy path', () => {
      const generator = resetPasswordSaga.doResetPassword({
        meta: {
          password: fakePassword,
          resetPasswordToken: fakePasswordToken,
          resolve,
          reject,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(resetPasswordApi, fakePasswordToken, fakePassword));

      expect(
        generator.next().value)
        .toEqual(
        call(resolve),
      );

      expect(
        generator.next().done)
        .toBeTruthy();
    });

    it('throws an error when password reset token is invalid', () => {
      const fakeErrorMessage = faker.lorem.sentence();
      const fakeStatusCode = 400;

      const generator = resetPasswordSaga.doResetPassword({
        meta: {
          resetPasswordToken: fakePasswordToken,
          password: fakePassword,
          resolve,
          reject,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(resetPasswordApi, fakePasswordToken, fakePassword));

      expect(
        generator.throw({
          message: fakeErrorMessage,
          statusCode: fakeStatusCode,
        }).value)
        .toEqual({ _error: 'Password reset token is invalid.' });

      expect(
        generator.next().value)
        .toEqual(
        call(reject, new SubmissionError()));

      expect(
        generator.next().done)
        .toBeTruthy();
    });

    it('throws an error when server connection fails', () => {
      const fakeErrorMessage = faker.lorem.sentence();
      const fakeStatusCode = 500;

      const generator = resetPasswordSaga.doResetPassword({
        meta: {
          resetPasswordToken: fakePasswordToken,
          password: fakePassword,
          resolve,
          reject,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(resetPasswordApi, fakePasswordToken, fakePassword));

      expect(
        generator.throw({
          message: fakeErrorMessage,
          statusCode: fakeStatusCode,
        }).value)
        .toEqual({ _error: 'Something went wrong on our end.' });

      expect(
        generator.next().value)
        .toEqual(
        call(reject, new SubmissionError()));

      expect(
        generator.next().done)
        .toBeTruthy();
    });
  });
});
