import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';
import emailSignin from '../../app/api/emailSigninApi';

jest.mock('api/helpers/asyncFetch');

describe('EmailSignin Api Call', () => {
  it('has a happy path', async () => {
    const authToken = faker.random.alphaNumeric(20);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const firstName = faker.name.firstName();

    asyncFetch.mockReturnValue({
      headers: {
        get: () => `Bearer ${authToken}`,
      },
      json: () => ({ data: { attributes: { id: undefined, userEmail: undefined } } }),
    });

    const response = await emailSignin(email, password);
    expect(response).toEqual({ authToken, id: undefined, userEmail: undefined });

    const calledUrl = asyncFetch.mock.calls[0][0];
    expect(calledUrl).toEqual('http://owsqas.ugent.be/api/token');

    const body = JSON.stringify({
      data: {
        type: 'tokens',
        attributes: {
          email,
          password,
        },
      },
    });

    const requestConfig = asyncFetch.mock.calls[0][1];
    expect(body).toEqual(requestConfig.body);

    expect(requestConfig.method).toEqual('POST');
  });
});
