import faker from 'faker';
import { call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import * as signupSaga from 'sagas/signup';
import signupApi from 'api/signup';

describe('Signup Saga', () => {
  describe('Signup Flow', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const resolve = jest.fn();
    const reject = jest.fn();

    it('has a happy path', () => {
      const generator = signupSaga.doSignup({
        meta: {
          values: { email, password, firstName, lastName },
          resolve,
          reject,
        },
      });

      expect(generator.next().value).toEqual(
        call(signupApi, email, password, firstName, lastName),
      );

      expect(generator.next().value).toEqual(call(resolve));

      expect(generator.next().done).toBeTruthy();
    });

    it('throws an error when field validation fails', () => {
      const message = faker.lorem.sentence();
      const statusCode = 422;
      const validationErrors = { email: 'Email has already been taken' };

      const generator = signupSaga.doSignup({
        meta: {
          values: { email, password, firstName, lastName },
          resolve,
          reject,
        },
      });

      expect(generator.next().value).toEqual(
        call(signupApi, email, password, firstName, lastName),
      );

      expect(
        generator.throw({ message, statusCode, validationErrors }).value,
      ).toEqual({ email: 'Email has already been taken' });

      expect(generator.next().value).toEqual(
        call(reject, new SubmissionError()),
      );

      expect(generator.next().done).toBeTruthy();
    });

    it('throws an error when server connection fails', () => {
      const message = faker.lorem.sentence();
      const statusCode = 500;

      const generator = signupSaga.doSignup({
        meta: {
          values: { email, password, firstName, lastName },
          resolve,
          reject,
        },
      });

      expect(generator.next().value).toEqual(
        call(signupApi, email, password, firstName, lastName),
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
