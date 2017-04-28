import faker from 'faker';
import { call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import * as signinSaga from 'sagas/signinSaga';
import signinApi from 'api/signinApi';

import {
  SIGNIN_USER_SUCCESS,
} from 'actions/signinActions';

describe('Signin Saga', () => {
  describe('Signin Flow', () => {
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();
    const resolve = jest.fn();
    const reject = jest.fn();

    it('has a happy path', () => {
      const fakeResponse = {
        authToken: faker.random.alphaNumeric(20),
        firstName: faker.name.firstName(),
      };

      const generator = signinSaga.doSignin({
        meta: {
          values: {
            email: fakeEmail,
            password: fakePassword,
          },
          resolve,
          reject,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(signinApi, fakeEmail, fakePassword));

      expect(
        generator.next(fakeResponse).value)
        .toEqual(
        put({
          type: SIGNIN_USER_SUCCESS,
          payload: { authToken: fakeResponse.authToken, firstName: fakeResponse.firstName },
        }));

      expect(
        generator.next().value)
        .toEqual(
        call(resolve),
      );

      expect(
        generator.next().done)
        .toBeTruthy();
    });

    it('throws an error when api call fails', () => {
      const fakeErrorMessage = faker.lorem.sentence();
      const fakeStatusCode = faker.random.number(501);

      const generator = signinSaga.doSignin({
        meta: {
          values: {
            email: fakeEmail,
            password: fakePassword,
          },
          resolve,
          reject,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(signinApi, fakeEmail, fakePassword));

      expect(
        generator.throw({
          message: fakeErrorMessage,
          statusCode: fakeStatusCode,
        }).value)
        .toEqual(call(reject, new SubmissionError({ _error: 'Credentials are invalid' })));

      expect(
        generator.next().done)
        .toBeTruthy();
    });

    it('throws if unable to find token in response', () => {
      const responseWithoutAuthToken = { authToken: undefined, firstName: faker.name.firstName() };

      const generator = signinSaga.doSignin({
        meta: {
          values: {
            email: fakeEmail,
            password: fakePassword,
          },
          resolve,
          reject,
        },
      });


      expect(
        generator.next().value)
        .toEqual(
        call(
          signinApi, fakeEmail, fakePassword));

      expect(
        generator.next(responseWithoutAuthToken).value)
        .toEqual(call(
          reject,
          new SubmissionError({ _error: 'Credentials are invalid' })));

      expect(
        generator.next().done)
        .toBeTruthy();
    });
  });
});
