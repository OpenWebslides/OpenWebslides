import faker from 'faker';
import { call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import * as signupSaga from 'sagas/signupSaga';
import signupApi from 'api/signupApi';

describe('Signup Saga', () => {
  describe('Signup Flow', () => {
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();
    const fakeFirstName = faker.name.firstName();
    const fakeLastName = faker.name.lastName();
    const resolve = jest.fn();
    const reject = jest.fn();

    it('has a happy path', () => {
      const generator = signupSaga.doSignup({
        meta: {
          values: {
            email: fakeEmail,
            password: fakePassword,
            firstName: fakeFirstName,
            lastName: fakeLastName,
          },
          resolve,
          reject,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(signupApi, fakeEmail, fakePassword, fakeFirstName, fakeLastName));

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

      const generator = signupSaga.doSignup({
        meta: {
          values: {
            email: fakeEmail,
            password: fakePassword,
            firstName: fakeFirstName,
            lastName: fakeLastName,
          },
          resolve,
          reject,
        },
      });

      expect(
        generator.next().value)
        .toEqual(
        call(signupApi, fakeEmail, fakePassword, fakeFirstName, fakeLastName));

      expect(
        generator.throw({
          message: fakeErrorMessage,
          statusCode: fakeStatusCode,
        }).value)
        .toEqual(call(
          reject,
          new SubmissionError({ _error: 'Something went wrong' })));

      expect(
        generator.next().done)
        .toBeTruthy();
    });
  });
});
