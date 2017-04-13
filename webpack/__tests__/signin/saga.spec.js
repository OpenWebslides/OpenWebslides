import faker from 'faker';
import { race, call, take } from 'redux-saga/effects';
import * as signinSaga from '../../modules/signin/sagas';
import { SIGNOUT_REQUEST } from '../../modules/signin/constants';
import signinApiCall from '../../modules/signin/api';

const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password();


describe('Signin Saga', () => {
  describe('Signin', () => {
    it('has a happy path', () => {
      const signinGenerator = signinSaga.signin({
        email: fakeEmail,
        password: fakePassword,
      });

      expect(
        signinGenerator.next().value)
        .toEqual(
        call(signinApiCall, fakeEmail, fakePassword));

      expect(
        signinGenerator.next().done)
        .toBeTruthy();
    });

    xit('throws an error when api call fails', () => {

    });

    xit('throws if unable to find token in response.body', () => {

    });
  });
});
