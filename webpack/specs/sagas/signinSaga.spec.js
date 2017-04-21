import faker from 'faker';
import { call, put } from 'redux-saga/effects';

import * as signinSaga from 'sagas/signin/signinSaga';
import signinApiCall from 'sagas/signin/signinApiCall';
import { types } from 'actions/signinActions';

describe('Signin Saga', () => {
  describe('Signin Flow', () => {
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();

    it('has a happy path', () => {
      const fakeResponseBody = { jwt: faker.random.alphaNumeric(20) };

      const generator = signinSaga.signinFlow({
        meta: {
          email: fakeEmail,
          password: fakePassword,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(signinApiCall, fakeEmail, fakePassword));

      expect(
        generator.next(fakeResponseBody).value)
        .toEqual(
        put({
          type: types.SIGNIN_SUCCESS,
          payload: { authToken: fakeResponseBody.jwt },
        }));

      expect(
        generator.next().done)
        .toBeTruthy();
    });

    it('throws an error when api call fails', () => {
      const fakeErrorMessage = faker.lorem.sentence();
      const fakeStatusCode = faker.random.number(501);

      const generator = signinSaga.signinFlow({
        meta: {
          email: fakeEmail,
          password: fakePassword,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(signinApiCall, fakeEmail, fakePassword));

      expect(
        generator.throw({
          message: fakeErrorMessage,
          statusCode: fakeStatusCode,
        })
          .value)
        .toEqual(
        put({
          type: types.SIGNIN_ERROR,
          payload: {
            message: fakeErrorMessage,
            statusCode: fakeStatusCode,
          },
        }));

      expect(
        generator.next().done)
        .toBeTruthy();
    });

    it('throws if unable to find token in response body', () => {
      const emptyResponseBody = { jwt: undefined };

      const generator = signinSaga.signinFlow({
        meta: {
          email: fakeEmail,
          password: fakePassword,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(
          signinApiCall, fakeEmail, fakePassword));

      expect(
        generator.next(emptyResponseBody).value)
        .toEqual(
        put({
          type: types.SIGNIN_ERROR,
          payload: {
            message: 'Unable to find JWT in response body',
            statusCode: undefined,
          },
        }));

      expect(
        generator.next().done)
        .toBeTruthy();
    });
  });
});
