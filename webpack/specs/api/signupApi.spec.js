import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';
import signup, { SIGNUP_API_URL } from '../../app/api/signup';

jest.mock('api/helpers/asyncFetch');

describe('API Auth', () => {
  describe('login', () => {
    it('has a happy path', async () => {
      const fakeEmail = faker.internet.email();
      const fakePassword = faker.internet.password();
      const fakeFirstName = faker.name.firstName();
      const fakeLastName = faker.name.lastName();
      const fakeResponse = { data: fakeEmail };

      asyncFetch.mockReturnValue(fakeResponse);

      const response = await signup(fakeEmail, fakePassword, fakeFirstName, fakeLastName);
      expect(response).toEqual(fakeResponse);

      const expectedUrl = SIGNUP_API_URL;
      const actualUrl = asyncFetch.mock.calls[0][0];
      expect(expectedUrl).toEqual(actualUrl);

      const expectedBody = JSON.stringify({
        data: {
          type: 'users',
          attributes: {
            email: fakeEmail,
            password: fakePassword,
            firstName: fakeFirstName,
            lastName: fakeLastName,
          },
        },
      });

      const actualRequestConfig = asyncFetch.mock.calls[0][1];
      expect(expectedBody).toEqual(actualRequestConfig.body);

      expect(actualRequestConfig.method).toEqual('POST');
    });
  });
});
