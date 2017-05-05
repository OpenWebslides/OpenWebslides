import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';
import emailSignin, { SIGNIN_API_URL } from '../../app/api/emailSignin';

jest.mock('api/helpers/asyncFetch');

describe('API Auth', () => {
  describe('login', () => {
    it('has a happy path', async () => {
      const fakeToken = faker.random.alphaNumeric(20);
      const fakeEmail = faker.internet.email();
      const fakePassword = faker.internet.password();

      asyncFetch.mockReturnValue({
        headers: {
          get: () => `Bearer ${fakeToken}`,
        },
      });

      const token = await emailSignin(fakeEmail, fakePassword);
      expect(token).toEqual({ authToken: fakeToken });

      const expectedUrl = SIGNIN_API_URL;
      const actualUrl = asyncFetch.mock.calls[0][0];
      expect(expectedUrl).toEqual(actualUrl);

      const expectedBody = JSON.stringify({
        data: {
          type: 'tokens',
          attributes: {
            email: fakeEmail,
            password: fakePassword,
          },
        },
      });

      const actualRequestConfig = asyncFetch.mock.calls[0][1];
      expect(expectedBody).toEqual(actualRequestConfig.body);

      expect(actualRequestConfig.method).toEqual('POST');
    });
  });
});
