import faker from 'faker';
import { call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import * as emailSigninSaga from 'sagas/signin/emailSigninSaga';
import emailSigninApi from 'api/emailSigninApi';

import { SIGNIN_USER_SUCCESS } from 'actions/signinActions';

describe('Email Signin Saga', () => {
  describe('Email Signin Flow', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const resolve = jest.fn();
    const reject = jest.fn();

    it('has a happy path', () => {
      const fakeResponse = {
        authToken: faker.random.alphaNumeric(20),
      };

      const generator = emailSigninSaga.doEmailSignin({
        meta: { values: { email, password }, resolve, reject },
      });

      expect(generator.next().value).toEqual(
        call(emailSigninApi, email, password),
      );

      expect(generator.next(fakeResponse).value).toEqual(
        put({
          type: SIGNIN_USER_SUCCESS,
          payload: { authToken: fakeResponse.authToken },
        }),
      );

      expect(generator.next().value).toEqual(call(resolve));

      expect(generator.next().done).toBeTruthy();
    });

    it('throws an error when credentials are invalid', () => {
      const message = faker.lorem.sentence();
      const statusCode = 401;

      const generator = emailSigninSaga.doEmailSignin({
        meta: { values: { email, password }, resolve, reject },
      });

      expect(generator.next().value).toEqual(
        call(emailSigninApi, email, password),
      );

      expect(generator.throw({ message, statusCode }).value).toEqual({
        _error: 'Password or email is incorrect.',
      });

      expect(generator.next().value).toEqual(
        call(reject, new SubmissionError()),
      );

      expect(generator.next().done).toBeTruthy();
    });

    it('throws an error when account is not yet activated', () => {
      const message = faker.lorem.sentence();
      const statusCode = 403;

      const generator = emailSigninSaga.doEmailSignin({
        meta: { values: { email, password }, resolve, reject },
      });

      expect(generator.next().value).toEqual(
        call(emailSigninApi, email, password),
      );

      expect(generator.throw({ message, statusCode }).value).toEqual({
        _error: 'Account had not yet been activated. Please check your email.',
      });

      expect(generator.next().value).toEqual(
        call(reject, new SubmissionError()),
      );

      expect(generator.next().done).toBeTruthy();
    });

    it('throws if unable to find token in response', () => {
      const response = { authToken: undefined };

      const generator = emailSigninSaga.doEmailSignin({
        meta: { values: { email, password }, resolve, reject },
      });

      expect(generator.next().value).toEqual(
        call(emailSigninApi, email, password),
      );

      expect(generator.next(response).value).toEqual({
        _error: 'Something went wrong on our end.',
      });

      expect(generator.next().value).toEqual(
        call(reject, new SubmissionError()),
      );

      expect(generator.next().done).toBeTruthy();
    });
  });
});
