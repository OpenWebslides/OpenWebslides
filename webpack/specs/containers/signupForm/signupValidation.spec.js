import faker from 'faker';
import * as emailSaga from 'sagas/serverValidation/emailAvailableSaga';
import { validate, asyncValidate } from 'containers/signupForm';

jest.mock('sagas/serverValidation/emailAvailableSaga');

describe('SignupForm validation', () => {
  describe('Synchronous field validation', () => {
    it('validates field presence', () => {
      const fakeValues = {
        email: '',
        password: '',
        passwordConfirmation: '',
        firstName: '',
        lastName: '',
      };
      expect(validate(fakeValues))
        .toEqual({
          email: 'Email is required',
          password: 'Password is required',
          passwordConfirmation: 'Password Confirmation is required',
          firstName: 'First Name is required',
          lastName: 'Last Name is required',
        });
    });

    it('validates entered email adresses for correctness', () => {
      const fakePassword = faker.internet.password();
      const fakeFirstName = faker.name.firstName();
      const fakeLastName = faker.name.lastName();
      const invalidEmail = faker.lorem.word();

      const fakeValues = {
        email: invalidEmail,
        password: fakePassword,
        passwordConfirmation: fakePassword,
        firstName: fakeFirstName,
        lastName: fakeLastName,
      };
      expect(validate(fakeValues))
        .toEqual({
          email: 'Email is invalid',
        });
    });

    it('validates equality of password and confirm password', () => {
      const fakeEmail = faker.internet.email();
      const fakePassword = faker.internet.password();
      const fakeFirstName = faker.name.firstName();
      const fakeLastName = faker.name.lastName();
      const fakeConfirmPassword = faker.internet.password();

      const fakeValues = {
        email: fakeEmail,
        password: fakePassword,
        passwordConfirmation: fakeConfirmPassword,
        firstName: fakeFirstName,
        lastName: fakeLastName,
      };
      expect(validate(fakeValues))
        .toEqual({
          password: 'Password and password confirmation do not match',
        });
    });
  });

  describe('asyncValidate', () => {
    xit('has a go', () => {
      emailSaga.checkEmailAvailable = 'blah';
      const async = asyncValidate({ email: 'reinvanim@gmai.com' });
      expect(async).toEqual({});
    });
  });
});
